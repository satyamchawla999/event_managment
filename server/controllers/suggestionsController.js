const Suggestion = require("../models/suggestions");

module.exports.addSuggestion = async (req, res) => {
    console.log(req.body)
    try {
      const suggestion = await Suggestion.create(req.body);
      if (!suggestion) {
        throw new Error("Suggestion not published");
      } else {
        res.status(201).json({ message: "Suggestion published successfully", suggestion });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  };
  
  module.exports.getSuggestions = async (req, res) => {
    try {
      const suggestions = await Suggestion.find();
      if (!suggestions) {
        throw new Error("unable to fetch suggestions");
      } else {
        res.status(200).json({ message: "Suggestions fetched successfully", suggestions });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  };
  