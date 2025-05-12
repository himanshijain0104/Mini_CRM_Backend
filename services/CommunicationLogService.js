const db = require('../config/db');

const communicationLogService = {
  // Get all communication logs
  getAllLogs: async () => {
    const [rows] = await db.query('SELECT * FROM communication_logs');
    return rows;
  },
  
  // Get all logs by campaign ID
  getAllLogsByCampaignId: async (campaign_id) => {
    const [rows] = await db.query(
      `SELECT cl.*, c.name AS campaign_name
       FROM communication_logs cl
       JOIN campaigns c ON c.id = cl.campaign_id
       WHERE cl.campaign_id = ?`,
      [campaign_id]
    );
    
    return rows;
  },
  
  // Create a new communication log
  createLog: async (logData) => {
    const { campaign_id, successCount, failureCount } = logData;
  
    // Insert into the updated communication_logs table
    const [result] = await db.query(
      'INSERT INTO communication_logs (campaign_id, successCount, failureCount) VALUES (?, ?, ?)',
      [campaign_id, successCount, failureCount]
    );
  
    // Return the inserted log with the generated id
    return { id: result.insertId, campaign_id, successCount, failureCount };
  }
  
};

module.exports = communicationLogService;
