var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://anonym:s1234@ds121309.mlab.com:21309/whitepanda', ['items']);

// Get All items
router.get('/items', function(req, res, next){
    db.items.find(function(err, items){
        if(err){
            res.send(err);
        }
        res.json(items);
    });
});

// Get Single item
router.get('/item/:id', function(req, res, next){
    db.items.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, item){
        if(err){
            res.send(err);
        }
        res.json(item);
    });
});

// Delete Item
router.get('/item/delete/:id', function(req, res, next){
    db.items.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, item){
        if(err){
            res.send(err);
        }
        db.items.find(function(err, items){
            if(err){
                res.send(err);
            }
            // console.log(items);
            res.render('index.html', {root: __dirname, items: items});
        });
        // res.send("Successfully Deleted");
    });
});

//Save item
router.post('/item', function(req, res, next){
    var item = req.body;
    if(!item.price){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.items.save(item, function(err, item){
            if(err){
                res.send(err);
            }
            console.log("Item Added");
            res.json(item);
        });
    }
});

// Delete item
router.delete('/item/:id', function(req, res, next){
    db.items.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, item){
        if(err){
            res.send(err);
        }
        res.json(item);
    });
});

// Update item
router.put('/item/:id', function(req, res, next){
    var item = req.body;
    var upditem = {};
    
    if(item.isDone){
        upditem.isDone = item.isDone;
    }
    
    if(item.title){
        upditem.title = item.title;
    }
    
    if(!upditem){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.items.update({_id: mongojs.ObjectId(req.params.id)},upditem, {}, function(err, item){
        if(err){
            res.send(err);
        }
        res.json(item);
    });
    }
});

module.exports = router;