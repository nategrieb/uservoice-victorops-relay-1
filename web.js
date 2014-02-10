var express = require("express");
var https = require("https");
var config = require("./config")
var app = express();

app.use(express.bodyParser());

app.post('/', function(req, res) {
  console.log(req.body);

  var payload = JSON.parse(req.body.data);
  var entity_id = payload.ticket.id;
  var subject = payload.ticket.subject;
  var entity_display_name = "Ticket " + payload.ticket.ticket_number;
  var monitoring_tool = "UserVoice";

  var victorOpsJSON = { message_type:"CRITICAL",
    entity_id:entity_id,
    state_message:subject,
    monitoring_tool: monitoring_tool,
    entity_display_name: entity_display_name
  };

  var victorOpsString = JSON.stringify(victorOpsJSON);

  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': victorOpsString.length
  };

  var options = {
          host: config.target.host,
          port: config.target.port,
          path: config.target.path,
          method: config.target.method,
          headers: headers
        };
  var remote_request = https.request(options, function(remote_response) {
    remote_response.setEncoding('utf-8');

    var responseString = '';

    remote_response.on('data', function(data) {
      responseString += data;
    });

    remote_response.on('end', function() {
      var resultObject = JSON.parse(responseString);
      console.log(resultObject);
      res.send(resultObject);
    });
  });

  remote_request.on('error', function(e) {
    console.log(e);
  });

  remote_request.write(victorOpsString);
  remote_request.end();

});

var port = process.env.PORT || 5000;
  app.listen(port, function() {
  console.log("Listening on " + port);
});
