# SpiderQueryBot

A Telegram Bot to streamline feedbacks, complaints feature suggestions to various websites maintained by spider  
Check it out [here](https://t.me/SpiderQueryBot) !!!

You can use it for your own purposes by editing the data in various files.

### Instructions

- Create a [Telegram Bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot).
- `git clone` the repository into a server.
- Edit the metadata in `sites_info.js` according to your needs.
- Rename secrets_example.json to `secrets.json` and populate it with your credentials.
- Set a [Web Hook](https://core.telegram.org/bots/api#setwebhook) to the _url of the server + / your-bot-token_. This can be anything but needs to be edited accordingly in index.js file.
- Spawn a process manager
