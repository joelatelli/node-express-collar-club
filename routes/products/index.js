const express = require('express');
const router = express.Router();

module.exports = (productService) => {

  router.get('/', async (req, res) => {
    try{
      const product = await productService.getProduct();
      res.send(product);
    }catch(err){
      return next(err);
    }
  });

  // Post route for saving player name and score
  router.post("/api/player", function (req, res) {
    db.Scores.create({
      player: req.body.player,
      score: req.body.score
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  return router;
};