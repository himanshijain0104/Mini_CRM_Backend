const express = require('express');
const router = express.Router();
const campaignService = require('../services/CampaignService');
const verifyToken = require('../middleware/verifyToken');
const segmentService = require('../services/segmentService');
const sendEmail = require('../utils/EmailService');
const communicationLogService = require('../services/CommunicationLogService');

// GET all campaigns
router.get('/campaigns',verifyToken, async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.status(200).json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching campaigns' });
  }
});

// POST new campaign
router.post('/campaigns',verifyToken, async (req, res) => {
  try {
    const newCampaign = await campaignService.createCampaign(req.body);
    res.status(201).json(newCampaign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating campaign' });
  }
});

//Send message to segment
router.post('/campaigns/sendMessage', verifyToken, async (req, res) => {
  try {
    const { campaign_id, messageTemplate, segment_id } = req.body;
    const segment = await segmentService.getSegmentById(segment_id);

    if (!segment) {
      return res.status(404).json({ error: 'Segment not found' });
    }

    const audienceData = await segmentService.previewSegment(segment[0].rules);

    let successCount = 0;
    let failureCount = 0;

    for (const customer of audienceData) {
      const personalizedMessage = `Hi ${customer.name}, ${messageTemplate}`;
      try {
        await sendEmail(customer.email, 'New mail from Xeno CRM', personalizedMessage);
        successCount++;
      } catch (error) {
        console.error(`Failed to send email to ${customer.email}:`, error);
        failureCount++;
        // continue sending to others
      }
    }
    console.log({successCount, failureCount});
    const logObj = {
      campaign_id,
      successCount,
      failureCount
    }
    await communicationLogService.createLog(logObj);
    res.status(200).json({
      message: 'Message sending process completed',
      successCount,
      failureCount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending messages' });
  }
});



module.exports = router;
