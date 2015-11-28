var hangoutsBot = require("hangouts-bot"); 
var bot = new hangoutsBot("alacret@gmail.com", "gmaila18064066"); 
bot.on('online', function() {
    console.log('online');
});
bot.on('message', function(from, message) {
    console.log(from + ">> " + message);
});
