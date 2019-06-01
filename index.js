var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var conf = require("secrets.json");
var messages = require("messages.json");
var request = require("request");
var telegram_url = "https://api.telegram.org/bot" + conf.token + "/";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var local_url = "localhost:3000";
var production_url = "https://spider.nitt.edu/spiderQuery";
var base_url = local_url;

app.post("/" + conf.token, function(req, res) {
  var message = req.body.message;
  if (message.text == "/start") {
    var keyboard = {
      inline_keyboard: [
        [
          { text: "Mess site", callback_data: "mess.nitt.edu" },
          { text: "OD Portal", callback_data: "od.nitt.edu" }
        ]
      ]
    };

    inlinekey.text = "Mess site";
    inlinekey.callback_data = "Hello data";
    keyboard_array.push(inlinekey);
    data = {
      chat_id: message.from.id,
      text:
        "Hello, " + req.body.message.from.first_name + "!\n" + messages.start,
      reply_markup: JSON.stringify(keyboard)
    };
  }
  request.post(telegram_url + "sendMessage", {
    json: data,
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send("success");
      }
    }
  });
  res.send("success");
});

app.get("/", function(req, res) {
  res.send("GET request");
});

app.listen(conf.port, function() {
  console.log(conf.token);
  console.log("listening on " + conf.port);
});
