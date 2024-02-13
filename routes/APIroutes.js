// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our model
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // Get route for returning words based on difficulty
  app.get("/api/words/difficulty/:difficulty", function (req, res) {
    db.Words.findAll({
      where: {
        difficulty: req.params.difficulty
      }
    }).then(function (dbWords) {
      res.json(dbWords);
    });
  });

  // Get route for getting top 5 highscores
  app.get("/api/player/scores", function (req, res) {
    db.Scores.findAll({
      order: [["score", "DESC"]],
      limit: 5
    }).then(function (dbScores) {
      res.json(dbScores);
    });
  });

  // Post route for saving player name and score
  app.post("/api/player", function (req, res) {
    db.Scores.create({
      player: req.body.player,
      score: req.body.score
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });
};