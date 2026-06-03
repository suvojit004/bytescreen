const asyncHandler = require("../utils/asyncHandler");

const leadService = require("../services/lead.service");

const createLead =
  asyncHandler(
    async (req, res) => {
      const lead =
        await leadService.createLead(
          req.body
        );

      res.status(201).json({
        success: true,
        data: lead,
      });
    }
  );

const getLeads =
  asyncHandler(
    async (req, res) => {
      const leads =
        await leadService.getLeads();

      res.status(200).json({
        success: true,
        data: leads,
      });
    }
  );

module.exports = {
  createLead,
  getLeads,
};