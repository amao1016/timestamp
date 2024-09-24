// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//:date?表示可選參數(可為空)
app.get("/api/:date?",(req,res)=>{
  let dateString = req.params.date;
  if(!dateString) //字串為空 返回目前
    return res.json({unix:new Date().getTime(),utc:new Date().toUTCString()});

  let date = !isNaN(dateString)? new Date(parseInt(dateString)) : new Date(dateString);
            //字串如果有無法傳成數字的就會變非nan Date()會自動判斷unix或日期
  let unixstamp = date.getTime(); //單位是毫秒
  let utcstamp=date.toUTCString();
  if(date.toString() === "Invalid Date") return res.json({error:"Invalid Date"});
  else return res.json({unix:unixstamp,utc:utcstamp});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
