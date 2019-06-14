
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = "surveyDB";

var mongoUrl = 'mongodb://localhost:27017/';
var db = null;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req,res) {
    var collection = db.collection('test');
    collection.find({}).toArray(function (err, serv){
    if (err){
        res.status(500).send({
            error: "Error fetching survey from DB"
        });
    } else{
        console.log("== surveys:", serv[0]);
        res.status(200).render('homePage', serv[0]);
    }   
    });
});

app.get('/:num', function(req,res) {

    var num = req.params.num.toLowerCase();
    num = parseInt(num,10);
    num--;
    var collection = db.collection('test');
    collection.find({}).toArray(function (err, serv){
    if (err){
        res.status(500).send({
            error: "Error fetching survey from DB"
        });
    } else{
        console.log("== serv[0]{}:", serv[0].surveys[num]);
        res.status(200).render('surveyPage', serv[0].surveys[num]);
    }   
    });
});
app.get('/results/:num', function(req,res,next) {

    var num = req.params.num.toLowerCase();
    num = parseInt(num,10);
    num--;

    var collection = db.collection('test');
    collection.find({}).toArray(function (err, serv){
     console.log("== Data Length: ",serv[0].surveys.length);
    if(num >= 0 && num < serv[0].surveys.length)
    {
                console.log("== serv[0]{}:", serv[0].surveys[num]);
        res.status(200).render('resultPage', serv[0].surveys[num]);

    } 
    else
    {
                res.status(404).render('404');
    }   
    }); 

});
app.post('/addSurvey', function (req, res) 
{
if (req.body && req.body.title && req.body.questions)
    {
    var collection = db.collection('test');
    collection.find({}).toArray(function (err, serv)
        {
        var leg = serv[0].surveys.length;
        var bURL = './' + leg;
        var resURL = './results' + leg;
        var serv = 
        {
        title: req.body.title,
        url: bURL,
        resultURL: resURL,         
        questions: req.body.questions
        };
        collection.updateOne({},{ $push: {surveys: serv}},function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Error inserting twit into DB"
          });
        } else {
          console.log("== update result:", result);
          if (result.matchedCount > 0) {
            res.status(200).send("Success");
          } else {
            next();
          }
        }
      });
  } 
)}
});


app.get('*', function (req, res) {
  res.status(404).render('404');
});


MongoClient.connect(mongoUrl, { useNewUrlParser: true },function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});