var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var fs = require('fs');
var Schema= mongoose.Schema;

var user = require('../models/user_schema.js');

// get a list of users from the db
router.get('/',function(req, res){
    user.getUsers(function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

//user login
router.post('/login', function(req, res) {
    auth = {username: req.body.username, password : req.body.password};
    user.findOne(auth, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        if(!user) {
            console.log(user);
            return res.status(404).send('Please enter a valid username and password');
        }
        else {
            console.log('You have successfully logged in' + user);
            res.send(user);
        }
    });
});

//Create user
router.post('/create', function(req, res) {
    auth = {username: req.body.username};
    user.findOne(auth, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (user) {
           return res.send("This username already exist")
        }
    });
    user.create(req.body).then(function (user) {
        // res.send('user record sucessfully created');
        res.send(user);
    })
});

// // creating like array
// router.post('/like/:secretKey/:title' , function (req,res){
//     title: req.params.title;
//
//     user.findOne({secretKey: req.params.secretKey}, function (err , user) {
//         if (err) {
//             console.log("error occured");
//             res.send(err);
//         }
//         user.likeBlog = title;
//     });
// });

//like the blog
router.post('/like' ,function(req,res){
    // res.send(req.body.secretKey);
    console.log("Enter into user /like backend");
    find = {secretKey : req.body.secretKey};
    _id = req.body._id;

    user.findOne(find, function(err, findOne) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (findOne) {
            findOne.likeBlog.push(_id);
            findOne.save();
            res.send(findOne);
        }
    });
});

//like the blog
router.post('/dislike' ,function(req,res){
    // res.send(req.body.secretKey);
    console.log("Enter into user /like backend");
    find = {secretKey : req.body.secretKey};
    _id = req.body._id;

    user.findOne(find, function(err, findOne) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (findOne) {
            findOne.likeBlog.pull(_id);
            findOne.save();
            res.send(findOne);
        }
    });
});

module.exports = router;