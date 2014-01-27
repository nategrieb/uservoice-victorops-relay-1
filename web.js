var express = require("express");
var app = express();

app.use(express.bodyParser());

app.post('/', function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
