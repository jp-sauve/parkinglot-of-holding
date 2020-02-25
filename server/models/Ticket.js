const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  timestamp: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  ticketNumber: {
    type: Number,
    required: true,
    min: [1, "Positive integers only"],
    unique: true
  }
});

module.exports = {
  ticketModel: mongoose.model("Ticket", TicketSchema),
  ticketSchema: TicketSchema
}
