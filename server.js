'use strict';

const Hapi = require('hapi');
const apiPivotal = "https://www.pivotaltracker.com/services/v5";
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

    console.log('Server running at:', server.info.uri);
});

//HANGOUTS PART

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
    [[0, 'HI! .. server started...  [created by ecaminero]']]);
}).done();


//SERVICE PART
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connect to pt database on mongo")
});

var projectSchema = mongoose.Schema({
    name: String,
    id: String,
    conversation_id: String
});

var Project = mongoose.model('Project', projectSchema);

server.route({
    method: 'GET',
    path:'/projects',
    handler: function (request, reply) {
        request(apiPivotal+"/projects", function(error, response, body){
            console.log("Request received");
            console.log(response);
      });
        Project.find({},function(err,projects){
            reply(projects);
        });
    }
});

server.route({
    method: 'POST',
    path:'/projects',
    handler: function (request, reply) {
        console.log(request.params);
        console.log(request.payload);
        return reply('');
    }
});