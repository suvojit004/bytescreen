const Lead = require("../models/lead.model");
const AppError = require("../utils/AppError");

const createLead = async (
    payload
) => {
    return Lead.create(payload);
};

const getLeads = async (filters = {}) => {
    const query = {};
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const skip = (page - 1) * limit;

    if (filters.status) {
        query.status = filters.status;
    }

    const [leads, total] = await Promise.all([
        Lead.find(query).populate(
            "notes.createdBy",
            "firstName lastName email")
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit),

        Lead.countDocuments(
            query
        ),
    ]);

    return {
        leads,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(
                total / limit
            ),
        },
    };
};

const getLeadById = async (leadId) => {
    const lead = await Lead.findById(leadId).populate(
        "notes.createdBy",
        "firstName lastName email"
    );

    if (!lead) {
        throw new AppError(
            "Lead not found",
            404
        );
    }

    return lead;
};

const updateLead = async (
    leadId,
    payload
) => {
    const lead =
        await Lead.findById(leadId);

    if (!lead) {
        throw new AppError(
            "Lead not found",
            404
        );
    }

    lead.status = payload.status;

    await lead.save();

    return lead;
};


const addNoteToLead = async (
    leadId,
    userId,
    payload
) => {
    const lead = await Lead.findById(leadId);

    if (!lead) {
        throw new AppError(
            "Lead not found",
            404
        );
    }

    lead.notes.push({
        text: payload.text,
        createdBy: userId,
    });

    await lead.save();

    return lead;
};

module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    addNoteToLead,
};