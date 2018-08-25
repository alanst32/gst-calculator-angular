/**
 * Created by alanterriaga on 30/7/18.
 */
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const path = require('path');

var User 	= require('../model/User');
var CalcHistory = require('../model/CalcHistory');

//ROUTE SEARCH USER ============================================
router.get('/api/findUser/:username', function(req, res){

    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    User.findOne(
        {
            username: req.params.username
        },
        function(err, user){
            if(err){
                res.send(err);
            }

            res.json(user)
        });
});

//ROUTE SEARCH HISTORY
router.get('/api/getCalcHistory', function(req, res){

  if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
  }

  CalcHistory.find({})
      .sort([["createdAt", -1]])
      .exec( function(err, calcHistory){

          if( err ){
            res.send(err);
          }

          // Return all history
          res.json(calcHistory);
      });
});

//ROUTE SAVE CAL HISTORY ============================================
router.post('/api/saveCalc', function(req, res){

    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    CalcHistory.create({
        inputPrice: req.body.inputPrice,
        priceAfter: req.body.priceAfter,
        gstAmount: req.body.gstAmount,
        done: false
    },
    function(err, calcHistory){
        if(err){
            res.send(err);
        }

        res.json(calcHistory);
    })
})

module.exports = router;

