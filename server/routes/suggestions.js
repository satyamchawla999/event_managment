const express = require("express");
const router = express.Router();
const Suggestion = require("../models/suggestions");

const suggestionsController = require("../controllers/suggestionsController");

router.post("/add-suggestion", suggestionsController.addSuggestion);
router.get("/get-suggestions", suggestionsController.getSuggestions);

module.exports = router;
