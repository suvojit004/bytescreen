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
      const result = await leadService.getLeads(req.query);


      res.status(200).json({
        success: true,
        data: result.leads,
        pagination: result.pagination,
      });
    }
  );

const getLeadById = asyncHandler(
  async (req, res) => {
    const lead =
      await leadService.getLeadById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: lead,
    });
  }
);

const deleteLeadById = asyncHandler(
  async (req, res) => {
    const lead = await leadService.deleteLeadById(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: lead,
    })
  }
)


module.exports = {
  createLead,
  getLeads,
  getLeadById,
  deleteLeadById,

};