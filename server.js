// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  
  let date;
  if (req.params.date_string === undefined){
    date = new Date();
  } else if (req.params.date_string.match(/\d{13}/)){
    date = new Date();
    date.setTime(Number(req.params.date_string));
  } else 
  date = new Date(req.params.date_string);
  
  var response = date == "Invalid Date" ? { error: "Invalid Date" } :{ "unix": date.getTime(), "utc": date.toUTCString()};
    
  res.json(response);

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});