const Garage = require("../models/Garage");

exports.createGarage = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ success: true, msg: "Create new garage" });
}