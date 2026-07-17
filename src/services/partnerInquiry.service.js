const PartnerInquiry = require("../models/partnerInquiry.model");
const AppError = require("../utils/AppError");

const createInquiry = async (payload) => {

    try{
         const inquiry = await PartnerInquiry.create(payload);
         return inquiry;
    }
    catch (e){
         throw new AppError("Database: Bad Request", 422);
    }
 
  
  
};

const getAllInquiries = async () => {
  return PartnerInquiry.find()
    .sort({ createdAt: -1 });
};

const getInquiryById = async (id) => {
  return PartnerInquiry.findById(id);
};

const updateInquiryStatus = async (
  id,
  status
) => {
  return PartnerInquiry.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};
const removeEnquiry = async (id) => {
  const inquiry = await PartnerInquiry.findById(id);
      if (!inquiry) {
          throw new AppError(
              "Lead not found",
              404
          );
      }
      const {acknowledged} = await inquiry.deleteOne();
      if(!acknowledged){
          return {message : "Delete faild"}
      }
      
      return {
          message: "Deleted Successfully"
      };
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  removeEnquiry
};