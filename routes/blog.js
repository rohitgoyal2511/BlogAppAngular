var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var fs = require('fs');
var Schema= mongoose.Schema;

var blog = require('../models/blog_schema.js');
var user = require('../models/user_schema.js');

// get a list blogs from the db
router.get('/',function(req, res){
    blog.getblog(function(err, blog){
        if(err){
            throw err;
        }
        res.json(blog);
    });
});

//Create a blog
router.post('/create',function (req,res) {

   console.log("author and body is:  " + req.body.author + "  " + req.body.body);
        blog.create(req.body).then(function (blog) {
            console.log('blog created successfully');
            res.send(blog);
        });
});

//Update a blog
router.post('/update',function(req,res){
    id =  {
             _id : req.body._id
    };
    update = {
        $set: {title: req.body.title,
                author: req.body.author,
                URL: req.body.URL,
                body: req.body.body
        }
    };

    blog.findOneAndUpdate(id, update, function(err, result){
        if(err){
            return res.status(500).send();
        }
        if(!result){
            console.log("You don't have authority to update this blog");
            return res.send("You don't have authority to update this blog")
        }
        else {
          console.log(result);
          res.send("blog updated succesfully");
        }
    });
});

    router.post('/delete', function(req,res) {
        console.log("enter into /delete");
       // res.send("ENter into delete");
        req = {_id : req.body._id};
        blog.findOneAndRemove(req , function(err , del) {
            blog.getblog(function(err, blog){
                if(err){
                    throw err;
                }
                res.json(blog);
            });
        });
    });


module.exports = router;