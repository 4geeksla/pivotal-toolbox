var Client = require('hangupsjs');
//var Q = require('q');

// callback to get promise for creds using stdin. this in turn
// means the user must fire up their browser and get the
// requested token.
var creds = function() {
  return {
    //auth: Client.authStdin
      auth: '4/kcx7B1QfNvWACfn-3LeV51x6j56IqWztLSX1rB9QZFg'
  };
};

var client = new Client();

// set more verbose logging
client.loglevel('debug');

// receive chat message events
client.on('chat_message', function(ev) {
  return console.log(ev);
});

// connect and post a message.
// the id is a conversation id.
client.connect(creds).then(function() {
    return client.sendchatmessage('UgwgjAkjSbqRJ0ALdsx4AaABAQ',
    [[0, 'I am a mother fucker nodeJD bot created by alacret']]);
}).done();
