/**
 * Created by alanterriaga on 30/7/18.
 */
var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var User 	= require('../model/User');

//ROUTE SEARCH ============================================
router.post('/api/findUser', function(req, res){

    User.findOne(
        {
            username: req.body.username

        }, function(err, users){
            if(err){
                res.send(err);
            }

            res.json(users)
        });
});

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
