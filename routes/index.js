var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://anonym:s1234@ds121309.mlab.com:21309/whitepanda', ['items']);


router.get('/', function(req, res, next){
    let items="No Item";

    db.items.find(function(err, items){
        if(err){
            res.send(err);
        }
        // console.log(items);
        res.render('index.html', {root: __dirname, items: items});
    });
    // console.log("items="+items);
});




module.exports = router;