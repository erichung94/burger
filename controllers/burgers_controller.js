var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    burger.selectAll(function(burger_data) {
        res.render('index', { burger_data });
    });
});

router.post('/burgers/insertOne', function(req, res) {
    if (req.body.burger_name == '') {
        console.log('No burger name entered');
        res.redirect('/');
    } else {

        burger.insertOne(req.body.burger_name, function(result) {
            console.log(result);
            res.redirect('/');
        });
    }
});

router.put('/burgers/updateOne', function(req, res) {
    burger.updateOne(req.body.burger_id, function(result) 
        console.log(result);
        res.redirect('/');
    });
});

module.exports = router;