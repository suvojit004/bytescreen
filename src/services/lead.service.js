const Lead = require("../models/lead.model");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const { success } = require("zod");

const createLead = async (
    payload
) => {
    const {firstName, email, inquiryType, message } = await Lead.create(payload);
    return {firstName,email,inquiryType,message};
};

const getLeads = async (filters = {}) => {
    const query = {};


    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.search) {
        query.$or = [
            {
                firstName: {
                    $regex: filters.search,
                    $options: "i",
                },
            },
            {
                lastName: {
                    $regex: filters.search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: filters.search,
                    $options: "i",
                },
            },
            {
                company: {
                    $regex: filters.search,
                    $options: "i",
                },
            },
        ];
    }
    const [leads, total] = await Promise.all([
        Lead.find(query)
            .sort({
                createdAt: -1,
            }),


        Lead.countDocuments(
            query
        ),
    ]);

    return {
        leads,
    };
};

const getLeadById = async (leadId) => {
    const lead = await Lead.findById(leadId)
    if (!lead) {
        throw new AppError(
            "Lead not found",
            404
        );
    }

    return lead;
};

const deleteLeadById = async (leadId, payload)=>{
    const lead = await Lead.findById(leadId);
    if (!lead) {
        throw new AppError(
            "Lead not found",
            404
        );
    }
    const {acknowledged} = await lead.deleteOne();
    if(!acknowledged){
        return {message : "Delete faild"}
    }
    
    return {
        message: "Deleted Successfully"
    };
}




module.exports = {
    createLead,
    getLeads,
    getLeadById,
    deleteLeadById

};