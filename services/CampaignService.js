const db = require('../config/db');

const campaignService = {
  // Get all campaigns
  getAllCampaigns: async () => {
    const [rows] = await db.query('SELECT * FROM campaigns');
    return rows;
  },

  // Create a new campaign
  createCampaign: async (campaignData) => {
    const { name, segment_id, message_template, audience_size, created_by } = campaignData;
    const [result] = await db.query(
      'INSERT INTO campaigns (name, segment_id, message_template, audience_size, created_by) VALUES (?, ?, ?, ?, ?)',
      [name, segment_id, message_template, audience_size, created_by]
    );
    return { id: result.insertId, ...campaignData };
  }
};

module.exports = campaignService;
