

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')

var app = express();
var port = process.env.PORT || 3000;


var surveyData = require('./surveyData');
console.log("== surveyData", surveyData);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));




app.get('/', function(req,res) {
	/*var person = req.params.person.toLowerCase();
  	if (surveyData[person]) {
    	res.status(200).render('surveyPage', surveyData[person]);
    // res.status(200).sendFile(
    //   __dirname + '/public/people/' + person + '.html'
    // );
  	} else {
    	next();
  	}*/

	res.status(200).render('homePage',surveyData);
});

app.get('/:num', function(req,res,next) {
  /*var person = req.params.person.toLowerCase();
    if (surveyData[person]) {
      res.status(200).render('surveyPage', surveyData[person]);
    // res.status(200).sendFile(
    //   __dirname + '/public/people/' + person + '.html'
    // );
    } else {
      next();
    }*/

    console.log("== Data Length: ",surveyData["surveys"].length);
    var num = req.params.num.toLowerCase();
    num = parseInt(num,10);
    num--;

    if(num >= 0 && num < surveyData["surveys"].length){

      res.status(200).render('surveyPage',surveyData["surveys"][num]);
    }
    else{
      next();
    }
});

app.get('/results/:num', function(req,res,next) {
  /*var person = req.params.person.toLowerCase();
    if (surveyData[person]) {
      res.status(200).render('surveyPage', surveyData[person]);
    // res.status(200).sendFile(
    //   __dirname + '/public/people/' + person + '.html'
    // );
    } else {
      next();
    }*/

    console.log("== Data Length: ",surveyData["surveys"].length);
    var num = req.params.num.toLowerCase();
    num = parseInt(num,10);
    num--;

    if(num >= 0 && num < surveyData["surveys"].length){

      res.status(200).render('resultPage',surveyData["surveys"][num]);

    }
    else{
      next();
    }
});



app.get('*', function (req, res) {
  res.status(404).render('404');
});


/*
app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
*/

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});