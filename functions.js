var reply_messages = require("./sites_info");
var conf = require("./secrets.json");
var messages = reply_messages.messages;
var info = reply_messages.info;
var request = require("request");
var telegram_url = "https://api.telegram.org/bot" + conf.spider_query_token + "/";
var info = reply_messages.info;
var messages = reply_messages.messages;
var query = reply_messages.query;

function send_greeting_sites(message, res) {

  let keyboard = {
    keyboard: [
      [
        {
          text: info.mess.text

        },
        { text: info.od.text }
      ],
      [{
        text: info.scient.text

      },
      {
        text: info.hostel.text
      }],
      [
        {
          text: info.sportsfete.text
        },
        {
          text: info.spider.text
        }

      ],
      [
        {
          text: info.general.text
        }
      ]
    ]
  };
  data = {
    chat_id: message.from.id,
    text:
      "Hello, " + message.from.first_name + "!\n" + messages.start,
    reply_markup: JSON.stringify(keyboard)
  };
  // send_message("sendMessage", message.from.id, data, res);
  return data;
}

function send_query_type(message) {
  let keyboard = {
    keyboard: [
      [
        {
          text: query.complaint.text

        }
      ],
      [
        {
          text: query.feature.text
        }
      ],
      [
        {
          text: query.feedback.text
        }
      ]
    ]
  };
  data = {
    text: messages.query,
    chat_id: message.from.id,
    reply_markup: JSON.stringify(keyboard)
  };
  return data;
}
function select_site(site_name) {
  for (let site in info) {
    if (info[site].text == site_name)
      return info[site].callback_data;
  }
  return null;
}

function select_query_type(query) {

}
function handleStart(user_state_map, message) {
  user_state_map[message.from.id] = {};
  data = send_greeting_sites(message);
  return data;
}
async function send_message(url, data) {

  request.post(telegram_url + url, {
    json: data,
    function(error, response, body) {
      return response.statusCode;
    }
  });

}
module.exports = {
  send_greeting_sites, send_message, send_query_type, select_site, handleStart
}