const express = require("express");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("./routes/medicineRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Medicine Traceability API running");
});

app.use("/api/medicine", medicineRoutes);

app.use(errorHandler);

module.exports = app;