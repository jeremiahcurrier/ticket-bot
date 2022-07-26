const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    token: process.env.SLACK_BOT_TOKEN,
    // signingSecret: process.env.SLACK_SIGNING_SECRET //Not required for socketMode: true, but does not harm if exists
});

(async () => {
    // await app.start(process.env.PORT || '3000'); // if socketMode: false
    await app.start();
    console.log('⚡️ Hello Whirled Peas... Bolt app is running!');
})();

//Call a function that contains lab1 example - Hello World
var lab1 = require(`./lab1.js`)
lab1.registerLab(app);

//Call a function that contains lab2 example - Events
var lab2 = require(`./lab2.js`)
lab2.registerLab(app);

//Call a function that contains lab3 example - Modals
var lab3 = require(`./lab3.js`)
lab3.registerLab(app);

//Call a function that contains lab4 example - Select Menus
var lab4 = require(`./lab4.js`)
lab4.registerLab(app);

//Call a function that contains lab5 example - Shortcuts
var lab5 = require(`./lab5.js`)
lab5.registerLab(app);

//Call a function that contains lab6 example - App Home
var lab6 = require(`./lab6.js`)
lab6.registerLab(app);

//Call a function that contains lab6 example - App Home
var lab7 = require(`./lab7.js`)
lab7.registerLab(app);

//Call a function that contains lab8 example - Workflow Steps
var lab8 = require(`./lab8.js`)
app.step(lab8.WFStep);
