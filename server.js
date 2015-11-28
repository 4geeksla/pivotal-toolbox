'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'odoo.geekies.co', 
    port: 8000 
});

// Add the route
server.register(require('inert'), function (err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });
});
server.route({
    method: 'GET',
    path:'/pivotal',
    handler: function (request, reply) {
	    console.log("TEST");
        return reply('');
    }
});
server.route({
    method: 'POST',
    path:'/pivotal',
    handler: function (request, reply) {
        console.log(request.payload);
        var conversation_id = 'UgwgjAkjSbqRJ0ALdsx4AaABAQ';
        var message = request.payload.message;
        var url = request.payload.primary_resources[0].url;

        var builder = new Client.MessageBuilder();
        builder.text(message + " ").link("story", url);
        client.sendchatmessage(conversation_id, builder.toSegments());

        return reply('');
    }
});

// Start the server
server.start((err) => {
    console.log(err);

    console.log('Server running at:', server.info.uri);
});



var Client = require('hangupsjs');
//var Q = require('q');

// callback to get promise for creds using stdin. this in turn
// means the user must fire up their browser and get the
// requested token.
var creds = function() {
  return {
    auth: Client.authStdin
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
    [[0, 'HI! .. i am from cabimas, nice to meet you...  [created by ecaminero]']]);
}).done();