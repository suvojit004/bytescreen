const Lead = require("../models/lead.model");

const createLead = async (
  payload
) => {
  return Lead.create(payload);
};

const getLeads = async () => {
    return Lead.find().sort({
      createdAt: -1,
    });
  };

module.exports = {
  createLead,
  getLeads,
};