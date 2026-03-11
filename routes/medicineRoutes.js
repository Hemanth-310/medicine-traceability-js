const express = require("express")

const router = express.Router()

const medicineController = require("../controllers/medicineController")

router.post("/register", medicineController.registerMedicine)

router.post("/transfer", medicineController.transferMedicine)

router.get("/verify/:batch_number", medicineController.verifyMedicine)

router.get("/track/:batch_number", medicineController.trackMedicine)

router.post("/pharmacy", medicineController.deliverToPharmacy)

router.post("/sell", medicineController.sellToPatient)

module.exports = router