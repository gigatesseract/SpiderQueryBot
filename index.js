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
var local_url = "localhost:3000";
var production_url = "https://spider.nitt.edu/spiderQuery";
var base_url = local_url;

app.post("/" + conf.spider_query_token, async function(req, res) {
  // console.log(req.body);
  let message = req.body.message;
  // console.log(message.chat);
  // console.log("this is user state:: ", user_state_map[message.from.id]);
  // if (user_state_map[message.from.id] === undefined || message.text == "/start") {
  //   let data = helpers.handleStart(user_state_map, message);
  //   console.log(data);
  //   let statusCode = await helpers.send_message("sendMessage", data);
  //   res.status(statusCode || 200).send();
  // }

  // console.log(message.from);
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
      // console.log("choosen query is", query);
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
      //site is not choosen --> message.text has site
      let site = helpers.select_site(message.text);

      if (site != null) {
        // console.log(site);
        user_state_map[message.from.id].site = site;
        // console.log(user_state_map[message.from.id]);
        let data = helpers.send_query_type(message);
        // console.log(data);
        let statusCode = await helpers.send_message("sendMessage", data);
        // console.log(statusCode);
        res.status(statusCode || 200).send();
        return;
      } else {
        let data = helpers.handleStart(user_state_map, message);

        let statusCode = await helpers.send_message("sendMessage", data);
        res.status(statusCode || 200).send();
        return;
      }
    }
    // console.log("site choosen");

    // }
    // else {

    // }
    // else if (!("query" in user_state_map[message.from.id])) {

    // }
    // else {

    // }
  } else {
    let data = helpers.handleStart(user_state_map, message);

    let statusCode = await helpers.send_message("sendMessage", data);
    res.status(statusCode || 200).send();
    return;
  }
  // helpers.send_message("sendMessage", message.from.id, data, res);
  // console.log(req.body);
  // console.log(message.data);
  // res.status(200).send("Success");

  // res.status(200).send("success");
});

app.get("/" + conf.spider_query_token, function(req, res) {
  res.status(200).send("GET request");
});

app.listen(conf.port, function() {
  // console.log(conf.spider_query_token);
  // console.log("listening on " + conf.port);
});
