var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var conf = require("./secrets.json");
var helpers = require("./functions");
var groups = require("./sites_info").groups;
var user_state_map = {};
var messages = require("./sites_info").messages;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/" + conf.spider_query_token, async function(req, res) {
  let message = req.body.message;
  if (message.from.id in user_state_map) {
    if (
      "query" in user_state_map[message.from.id] &&
      "site" in user_state_map[message.from.id]
    ) {
      let to_forward = message.text;
      let data = {
        text: messages.thank_you,
        chat_id: message.from.id
      };
      let statusCode = await helpers.send_message("sendMessage", data);
      data = {
        text:
          String.fromCodePoint(0x203c) +
          " <b>" +
          user_state_map[message.from.id].query +
          "</b> for " +
          user_state_map[message.from.id].site +
          "\n" +
          to_forward,
        chat_id: groups.complaints_portal
      };
      statusCode = await helpers.send_message("sendMessage", data);
      delete user_state_map[message.from.id];
      res.status(statusCode || 200).send();
      return;
    } else if ("site" in user_state_map[message.from.id]) {
      // site is already chosen
      let query = helpers.select_query_type(message.text);

      if (query != null) {
        user_state_map[message.from.id].query = query;
        let data = helpers.send_final_question(
          message,
          user_state_map[message.from.id]
        );
        let statusCode = await helpers.send_message("sendMessage", data);
        res.status(statusCode || 200).send();
        return;
      } else {
        let data = helpers.handleStart(user_state_map, message);

        let statusCode = await helpers.send_message("sendMessage", data);
        res.status(statusCode || 200).send();
        return;
      }
    } else {
      let site = helpers.select_site(message.text);

      if (site != null) {
        user_state_map[message.from.id].site = site;
        let data = helpers.send_query_type(message);

        let statusCode = await helpers.send_message("sendMessage", data);

        res.status(statusCode || 200).send();
        return;
      } else {
        let data = helpers.handleStart(user_state_map, message);

        let statusCode = await helpers.send_message("sendMessage", data);
        res.status(statusCode || 200).send();
        return;
      }
    }
  } else {
    let data = helpers.handleStart(user_state_map, message);

    let statusCode = await helpers.send_message("sendMessage", data);
    res.status(statusCode || 200).send();
    return;
  }
});

app.get("/" + conf.spider_query_token, function(req, res) {
  res.status(200).send("GET request");
});

app.listen(conf.port, function() {
  console.log("listening on " + conf.port);
});
