'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'odoo.geekies.co', 
    port: 8000 
});

// Add the route
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
	console.log(request)
        return reply('hello world');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
