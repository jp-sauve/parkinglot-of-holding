const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date must be included"],
    unique: false,
    trim: true
  },
  ticketNumber: {
    type: Number,
    required: [true, "A ticket is not a ticket without a ticket number!"],
    min: [1, "Positive integers only"],
    unique: true
  }
});

const GarageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Garages must have names"],
    unique: true,
    trim: true
  },
  outstandingTickets: [TicketSchema],
  lastTicketNumber: Number,
  parkingSpots: {
    type: Number,
    required: [true, "Garage must account for available spots"],
    unique: false
  }
});

module.exports = mongoose.model("Garage", GarageSchema);
