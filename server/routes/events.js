const express = require("express");
const router = express.Router();
const User = require("../models/events");

const eventsController = require("../controllers/eventsController");

router.post("/add-event", eventsController.addEvent);
router.get("/get-events", eventsController.getEvents);
router.post("/book-event", eventsController.bookEvent);
router.post("/get-single-event", eventsController.getSingleEvent);
router.post("/delete-event", eventsController.deleteEvent);


module.exports = router;
