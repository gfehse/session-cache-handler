var http = require('http');
var cacheAPI = require('./cacheAPI.js');

// Create the http Server Cache
var cacheServer = http.createServer(requestListener);

// handling http enquires 
function requestListener(request, response) {

	//TODO: just for a while returning 200 
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('okay');	
}

cacheServer.listen(15000);

