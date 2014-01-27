var express = require("express");
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

  console.log(victorOpsString);
  res.send(victorOpsString);
});

var port = process.env.PORT || 5000;
  app.listen(port, function() {
  console.log("Listening on " + port);
});
