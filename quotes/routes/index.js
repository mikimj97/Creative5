var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/quoteDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

var quoteSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Quote: String
});

var Quote = mongoose.model('Quote', quoteSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.get('/quote', function(req, res, next) {


    console.log("In a route");
    console.log(req.body);
    console.log("Request");
    var requestname = req.query["q"];
    console.log(requestname);
    console.log("flag");
    var obj = {};
    if (requestname) {
        obj = { Name: requestname };
        Quote.find(obj, function(err, list) {
            if (err) { console.error(err); }
            else {
                console.log(list);
                res.json(list);
            }
        });
    }
    else {
        Quote.find({}, function(err, list) { //Calls the find() method on your database
            if (err) { console.error(err); }
            else {
                console.log(list);
                res.json(list);
            }
        });
    }

});

router.post('/quote', function(req, res, next) {
    console.log("POST quote route"); //[1]
    console.log(req.body);
    var newquote = new Quote(req.body); //[3]
    console.log(newquote); //[3]
    newquote.save(function(err, post) { //[4]
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

router.delete('/quote', function(req, res, next) {
    console.log("In delete route");
    Quote.deleteMany({}, function(err, result) {
        if (err) return console.error(err);
    })
});




module.exports = router;
