const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({

  stage: String,

  actor: String,

  location: String,

  quantity: Number,

  transfer_date: {
    type: Date,
    default: Date.now
  }

})

const medicineSchema = new mongoose.Schema({

  medicine_name: {
    type: String,
    required: true
  },

  manufacturer: {
    type: String,
    required: true
  },

  batch_number: {
    type: String,
    required: true,
    unique: true
  },

  manufacturing_date: Date,

  expiry_date: Date,

  composition: String,

  dosage_form: String,

  quantity: Number,

  current_owner: {
    type: String,
    default: "Manufacturer"
  },

  location: String,

  status: {
    type: String,
    default: "Manufactured"
  },

  history: [historySchema]

})

module.exports = mongoose.model("Medicine", medicineSchema)