var http = require('http');
var _url_ = require('url');
var cacheAPI = require('./cacheAPI.js');

// Create the http Server Cache
var cacheServer = http.createServer(handleRequest);
cacheServer.listen(15000);


function handleRequest(request, response) {

	var method = request.method;
	var url = _url_.parse(request.url, true);
	var result = '';
	if(method=='GET' && url.query && url.query.sessionId) {
		result = cacheAPI.readCache(url.query.sessionId);
	}

	if(method=='POST') {

	}

	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.write(result);
	response.end();


}
