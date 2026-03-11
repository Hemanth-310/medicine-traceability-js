const Medicine = require("../models/Medicine")

// Register medicine
exports.registerMedicine = async (req, res) => {

  try {

    const medicine = new Medicine({
      ...req.body,
      history: [
        {
          stage: "Manufactured",
          actor: req.body.manufacturer,
          location: req.body.location,
          quantity: req.body.quantity,
          transfer_date: new Date()
        }
      ]
    })

    await medicine.save()

    res.status(201).json({
      message: "Medicine registered successfully",
      data: medicine
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}



// Transfer medicine
exports.transferMedicine = async (req, res) => {

  try {

    const { batch_number, new_owner, location, quantity } = req.body

    const medicine = await Medicine.findOne({ batch_number })

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }

    if (quantity > medicine.quantity) {
      return res.status(400).json({
        message: "Transfer quantity exceeds available stock"
      })
    }

    medicine.quantity -= quantity
    medicine.current_owner = new_owner
    medicine.location = location
    medicine.status = "Transferred"

    medicine.history.push({
      stage: "Transferred",
      actor: new_owner,
      location: location,
      quantity: quantity,
      transfer_date: new Date()
    })

    await medicine.save()

    res.json({
      message: "Medicine transferred successfully",
      remaining_stock: medicine.quantity,
      medicine
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}



// Verify medicine
exports.verifyMedicine = async (req, res) => {

  try {

    const { batch_number } = req.params

    const medicine = await Medicine.findOne({ batch_number })

    if (!medicine) {

      return res.status(404).json({
        valid: false,
        message: "Medicine NOT found. Possible counterfeit."
      })

    }

    res.json({
      valid: true,
      medicine
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}



// Track history
exports.trackMedicine = async (req, res) => {

  try {

    const { batch_number } = req.params

    const medicine = await Medicine.findOne({ batch_number })

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }

    res.json({
      batch_number: medicine.batch_number,
      history: medicine.history
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}
// Deliver medicine to pharmacy

exports.deliverToPharmacy = async (req, res) => {

  try {

    const { batch_number, pharmacy_name, location, quantity } = req.body

    const medicine = await Medicine.findOne({ batch_number })

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }

    if (quantity > medicine.quantity) {
      return res.status(400).json({
        message: "Quantity exceeds available stock"
      })
    }

    medicine.quantity -= quantity
    medicine.current_owner = pharmacy_name
    medicine.location = location
    medicine.status = "At Pharmacy"

    medicine.history.push({
      stage: "Delivered to Pharmacy",
      actor: pharmacy_name,
      location: location,
      quantity: quantity,
      transfer_date: new Date()
    })

    await medicine.save()

    res.json({
      message: "Medicine delivered to pharmacy",
      remaining_stock: medicine.quantity
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}




// Mark medicine sold to patient

exports.sellToPatient = async (req, res) => {

  try {

    const { batch_number, pharmacy_name, quantity } = req.body

    const medicine = await Medicine.findOne({ batch_number })

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }

    if (quantity > medicine.quantity) {
      return res.status(400).json({
        message: "Not enough stock"
      })
    }

    medicine.quantity -= quantity
    medicine.status = "Sold"

    medicine.history.push({
      stage: "Sold to Patient",
      actor: pharmacy_name,
      location: medicine.location,
      quantity: quantity,
      transfer_date: new Date()
    })

    await medicine.save()

    res.json({
      message: "Medicine sold to patient",
      remaining_stock: medicine.quantity
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}