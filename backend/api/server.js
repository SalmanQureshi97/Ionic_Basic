var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");

app.use(cors());
// app.get('/listUsers', function (req, res) {

//     console.log(req.query)

//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       console.log( data );
//       res.end( data );
//    });
// })

app.get("/listUsers", function (req, res) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + 1000) {
    end = new Date().getTime();
  }
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    res.end(data);
  });
});

app.listen(8081, function () {
  //var host = server.address().address
  //var port = server.address().port
  console.log("Example app listening at http://%s:%s", "127.0.0.1", "8081");
});
