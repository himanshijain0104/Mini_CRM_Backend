const db = require('../config/db');

const segmentService = {
  // Get all segments
  getAllSegments: async () => {
    const [rows] = await db.query('SELECT * FROM segments');
    return rows;
  },
  // Get all segments with audience size
  getSegmentDataForCampaign: async () => {
    const [rows] = await db.query('SELECT id, name, audience_size FROM segments');
    return rows;
  },
  // GET segment by ID
  getSegmentById: async (id) => {
    const [rows] = await db.query('SELECT * FROM segments WHERE id = ?', [id]);
    return rows;
  },
  // Create a new segment
  createSegment: async (segmentData) => {
    const { name, rules, created_by, audience_size } = segmentData;
    const [result] = await db.query(
      'INSERT INTO segments (name, rules, created_by,audience_size) VALUES (?, ?, ?,?)',
      [name, JSON.stringify(rules), created_by,audience_size]
    );
    return { id: result.insertId, name, rules, created_by,audience_size };
  },
  
  //Preview segment
  previewSegment: async (rules) => {
    let query = 'SELECT * FROM customers WHERE 1=1';
    const values = [];
    const conditions = [];
    const allowedOperators = ['>=', '<=', '=', '<', '>'];
    const logicalOperator = rules.logicalOperator === 'OR' ? 'OR' : 'AND'; // default to AND
  
    // Dynamic condition for total_spend
    if (rules.total_spend !== undefined && rules.spendOperator && allowedOperators.includes(rules.spendOperator)) {
      conditions.push(`total_spend ${rules.spendOperator} ?`);
      values.push(rules.total_spend);
    }
  
    // Dynamic condition for visit_count
    if (rules.visit_count !== undefined && rules.visitsOperator && allowedOperators.includes(rules.visitsOperator)) {
      conditions.push(`visit_count ${rules.visitsOperator} ?`);
      values.push(rules.visit_count);
    }
  
    // Appending conditions with the chosen logical operator
    if (conditions.length > 0) {
      query += ' AND (' + conditions.join(` ${logicalOperator} `) + ')';
    }
  
    console.log(query, values);
    const [rows] = await db.query(query, values);
    return rows;
  }
};
  

module.exports = segmentService;
