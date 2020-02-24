const tickets = require("../../controllers/tickets");
const payments = require("../../controllers/payments");

function api(routers) {
  routers.public.post("/tickets", tickets.post);
  routers.public.get("/tickets/:ticketNumber", tickets.get);
  routers.public.post("/payments/:ticketNumber", payments.post);
}

module.exports = api;
