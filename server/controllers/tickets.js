const Garage = require("../models/Garage").garageModel;

function get(req, res) {
  // calculate amount owing
  res.status(200).json({
    requestedNumber: req.params.ticketNumber,
    enter: "timestamp",
    depart: "timestamp",
    cost: "dollars"
  });
}
/**
 * @description Get parking ticket if available
 * @param {*} req Request object
 * @param {*} res Response object
 */
async function post(req, res) {
  console.log("Getting new ticket...");
  const garage = await Garage.find({ name: process.env.GARAGE_NAME });
  if (garage.length > 0) {
    let ourGarage = garage[0];
    if (ourGarage.availableSpots > 0) {
      console.log(ourGarage.availableSpots, "spots are available");
      ourGarage.outstandingTickets.push({
        date: new Date(),
        ticketNumber: ourGarage.lastTicketNumber + 1
      });
      ourGarage.lastTicketNumber = ourGarage.lastTicketNumber + 1;
      ourGarage.availableSpots = ourGarage.availableSpots - 1;
      const savedRecord = await ourGarage.save();
      res.status(201).json({ success: true, data: savedRecord });
    } else {
      res.status(400).json({
        success: false,
        message: "Lot full. We're sorry for the inconvenience."
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "No garage was found, so all is not well!"
    });
  }
  // Check if garage availableSpots < totalParkingSpots
  // If so, create new ticket using garage's lastTicketNumber + 1,
  // increment garage's lastTicketNumber and decrement availableSpots,
  // add ticket to outstandingTickets, return ticket
}

module.exports = {
  get,
  post
};
