const tickets = require("../../controllers/tickets");
const payments = require("../../controllers/payments");

function api(routers, apiSentry) {
  routers.public.post("/tickets", apiSentry, tickets.post);
  // No data is recorded, so this route bypasses middleware
  routers.public.get("/tickets/:ticketNumber", tickets.get);
  routers.public.post("/payments/:ticketNumber", apiSentry, payments.post);
}

module.exports = api;
