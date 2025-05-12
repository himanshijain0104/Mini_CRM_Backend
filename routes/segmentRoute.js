const express = require('express');
const router = express.Router();
const segmentService = require('../services/segmentService');
const verifyToken = require('../middleware/verifyToken');

// GET all segments
router.get('/segments', verifyToken, async (req, res) => {
  try {
    const segments = await segmentService.getAllSegments();
    res.status(200).json(segments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching segments' });
  }
});

//Preview segment
router.post('/segment-preview', async (req, res) => {
  try {
    const preview = await segmentService.previewSegment(req.body);
    res.status(200).json({preview,audience_size:preview.length,rules:req.body,});
  } catch (err) {
    res.status(500).json({ error: 'Error previewing segment' });
  }
});


// POST new segment
router.post('/segments',verifyToken, async (req, res) => {
  try {
    const newSegment = await segmentService.createSegment(req.body);
    res.status(201).json(newSegment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating segment' });
  }
});

//GET segment data for campaign
router.get('/segments/idname', async (req, res) => {
  try {
   const rows = await segmentService.getSegmentDataForCampaign();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
