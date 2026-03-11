const Medicine = require("../models/Medicine");

exports.registerMedicine = async (data) => {
  const medicine = new Medicine(data);
  return await medicine.save();
};

exports.getMedicine = async (id) => {
  return await Medicine.findOne({ medicine_id: id });
};