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
        console.log('\n\nPAYLOAD\n\n');
        console.log(request.payload);

        var projet_id = request.payload.project.id;

        Project.find({id:projet_id},function(err, pp){
            console.log('\n\nPROJECT\n\n');
            console.log(pp);
            if(err) {
                reply(err);
                return;
            }
            if(pp){
                var message = request.payload.message;
                if(message.indexOf("this") !== -1 ){//Swith 'this' for the story name
                    if(request.payload.changes){
                       request.payload.changes.forEach(function(c){
                           if(c.kind==='story'){
                                message = message.replace("this", '"'+c.name+'"');
                           }
                       });
                    }
                }
                pp.forEach(function(p){
                    var conversation_id = p.conversation_id;
                    var url = request.payload.primary_resources[0].url;
                    var builder = new Client.MessageBuilder();
                    builder.text(message + " ").link("story", url);
                    client.sendchatmessage(conversation_id, builder.toSegments());
                });
            }
        });
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
//client.loglevel('debug');

// receive chat message events
client.on('chat_message', function(ev) {
  return console.log(ev);
});

// connect and post a message.
// the id is a conversation id.
client.connect(creds).then(function() {
    return client.sendchatmessage('UgwgjAkjSbqRJ0ALdsx4AaABAQ',
    [[0, 'HI! .. Pivotal Toolbox started...  [created by alacret]']]);
}).done();


//SERVICE PART
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pt');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {console.log("connect to pt database on mongo")});

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