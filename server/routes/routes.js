/**
 * Created by alanterriaga on 30/7/18.
 */
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const path = require('path');

var User 	= require('../model/User');

//ROUTE SEARCH USER ============================================
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

module.exports = router;
