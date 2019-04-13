//Set up Dependencies
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get route -> index
router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    //express callback response by calling burger.selectAllBurger
    burger.selectAll(function(burger_data) {
        //wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
        res.render('index', { burger_data });
    });
});

//post route -> back to index
router.post('/burgers/insertOne', function(req, res) {
    if (req.body.burger_name == '') {
        console.log('No burger name entered');
        res.redirect('/');
    } else {
        //takes the request object using it as input for buger.addBurger
        burger.insertOne(req.body.burger_name, function(result) {
            //wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
            console.log(result);
            res.redirect('/');
        });
    }
});

//put route -> back to index
router.put('/burgers/updateOne', function(req, res) {
    burger.updateOne(req.body.burger_id, function(result) {
        //wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
        console.log(result);
        res.redirect('/');
    });
});

module.exports = router;