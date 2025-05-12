const express = require('express');
const router = express.Router();
const logService = require('../services/CommunicationLogService');
const verifyToken = require('../middleware/verifyToken');

// GET all logs
router.get('/logs',verifyToken, async (req, res) => {
  try {
    const logs = await logService.getAllLogs();
    res.status(200).json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching logs' });
  }
});

// GET logs by campaign ID
router.get('/logs/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await logService.getAllLogsByCampaignId(id);
    res.status(200).json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching logs' });
  }
});

// POST new log
router.post('/logs',verifyToken, async (req, res) => {
  try {
    const newLog = await logService.createLog(req.body);
    res.status(201).json(newLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating log' });
  }
});

module.exports = router;
