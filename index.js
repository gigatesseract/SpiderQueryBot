var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var conf = require("./secrets.json");
var helpers = require("./functions");
var user_state_map = {};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var local_url = "localhost:3000";
var production_url = "https://spider.nitt.edu/spiderQuery";
var base_url = local_url;

app.post("/" + conf.spider_query_token, async function (req, res) {
  // console.log(req.body);
  let message = req.body.message;
  console.log("this is user state:: ", user_state_map[message.from.id]);
  if (user_state_map[message.from.id] === undefined || message.text == "/start") {
    let data = helpers.handleStart(user_state_map, message);
    console.log(data);
    let statusCode = await helpers.send_message("sendMessage", data);
    res.status(statusCode || 200).send();
  }

  // console.log(message.from);
  if (message.from.id in user_state_map) {
    if (!("site" in user_state_map)) {
      let site = helpers.select_site(message.text);
      if (site != null) {
        user_state_map[message.from.id].site = site;
        let data = helpers.send_query_type(message, res);
        console.log(data);
        let statusCode = await helpers.send_message("sendMessage", data);
        console.log(statusCode);
        res.status(statusCode || 200).send();
        return;
      }
      else {
        let data = helpers.handleStart(user_state_map, message);

        let statusCode = await helpers.send_message("sendMessage", data);
        res.status(statusCode || 200).send();
        return;
      }
    }
    else {
      let query = helpers.select_query_type(message.text);

    }
  }
  // helpers.send_message("sendMessage", message.from.id, data, res);
  // console.log(req.body);
  // console.log(message.data);
  // res.status(200).send("Success");



  // res.status(200).send("success");
});

app.get("/" + conf.spider_query_token, function (req, res) {
  res.status(200).send("GET request");
});

app.listen(conf.port, function () {
  console.log(conf.spider_query_token);
  console.log("listening on " + conf.port);
});
