var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var fs = require('fs');

app.use(express.static('public'));
app.set('view engine', 'ejs');

var fileDatabase;
fs.readFile('data.json', 'utf-8', function(error, data) {
  if (!error) {
    fileDatabase = JSON.parse(data);
  }
});

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/info/1/:name', function(req, res) {
  
  var fileName = '.' + req.params.name;
  var result = fileDatabase[fileName];
  if (result) {
    type = result
  } else {
    type = "File Extension Not Found";
  }
  
  res.send({type});
});

app.get('/info/2/:name', function(req, res) {
  
  var url = 'https://fileinfo.com/extension/' + req.params.name;
  
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      
      var type, programs;
      
      $('title').filter(function() {
        var text = $(this).text();
        if (text == "File Extension Not Found") {
            type = text;
        } else {
          $('.ext > h2 span:nth-child(2)').filter(function() {
            type = $(this).text();
          });
        }
        json = {type};
        res.send(json);
      });
      
      

    } else {
      res.send(error);
    }
    
  });
  
});

app.listen(3000);

console.log('Magic happens on port 3000');
