var http = require('http');
var express = require("express");
var app = express();
var cacheApp = express();
app.use("/cache", cacheApp);
var _url_ = require('url');
var cacheAPI = require('./cacheAPI.js');

app.listen(15000);




function handleGET(request, response) {

	var url = _url_.parse(request.url, true);
	var result = '';
	if(url.query && url.query.sessionId) {
		result = cacheAPI.readCache(url.query.sessionId);

		if(!result) {
			result = 'not found';
		}
	}

	handleResponse(200, {}, response);


}

function handlePOST(request, response) {

	var body;
    request.on('data', function(chunk){
    	if(body) {
 	       body += chunk;		
    	}
    	else {
    		body = chunk;
    	}
    });

    request.on('end', function(){
        var fbResponse = JSON.parse(body);
 		handleResponse(200, fbResponse, response);
 	});
}   


function handleResponse(httpCode, object, response) {
		response.writeHead(httpCode, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(object));
        response.end();
}



cacheApp.get('/get', handleGET);
cacheApp.post('/update', handlePOST);