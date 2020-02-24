const mongoose = require("mongoose");
const Ticket = require("./Ticket");
const Schema = mongoose.Schema;

const GarageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Garages must have unique names"],
    unique: true,
    trim: true
  },
  outstandingTickets: [Ticket.ticketSchema],
  lastTicketNumber: Number,
  availableSpots: {
    type: Number,
    required: [
      true,
      "Should be the same as totalParkingSpots when garage is created"
    ]
  },
  totalParkingSpots: {
    type: Number,
    required: [true, "Garage must have a measured number of spots"],
    unique: false
  }
});

module.exports = {
  garageModel: mongoose.model("Garage", GarageSchema),
  ticketModel: Ticket.ticketModel
};
