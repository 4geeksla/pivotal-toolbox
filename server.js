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
	    console.log(request.params);
        console.log("\n\n");
        console.log(request.paramsArray);
        console.log("\n\n");
        console.log(request.payload);
        console.log("\n\n");
        console.log(request.query);
        return reply('');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
