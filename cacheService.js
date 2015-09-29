var http = require('http');
var express = require("express");
var app = express();
var cacheApp = express();
app.use("/cache", cacheApp);
var _url_ = require('url');
var cacheAPI = require('./cacheAPI.js');

app.listen(15000);




function handleGET(request, response) {

	return (function(request, response) {
		var url = _url_.parse(request.url, true);

		if(url.query && url.query.sessionId) {
			var result = cacheAPI.readCache(url.query.sessionId);

			if(result) {
				handleResponse(response).ok(result);
			}
			else {
				handleResponse(response).notfound();
			}
		}

	})(request, response);




}

function handlePOST(request, response) {

	return (function(request, response) {

		handlePayload(request, function(data) {
       	var fbResponse = JSON.parse(data);

        if(fbResponse.sessionId && fbResponse.userId) {
        	var result = cacheAPI.storeCache(fbResponse.sessionId, fbResponse.userId, 5);

        	if(result) {
	  			handleResponse(response).ok();
		 		return;
        	}
        }

		handleResponse(response).notfound();
 
    });


	})(request, response);

}

function handlePUT(request, response) {

	return (function(request, response){

	   handlePayload(request, function(data) {
    	   var fbResponse = JSON.parse(data);

        	if(fbResponse.sessionId) {
        		var result = cacheAPI.updateTTL(fbResponse.sessionId, 5);
        		if(result) {
	  				handleResponse(response).ok();
		 			return;
        		}

        	}
  			handleResponse(response).notfound();

    });


	})(request, response);

 

}   


function handlePayload(request, callbackSuccess, callbackError) {


	var body;
    request.on('data', function(chunk){
    	if(body) {
 	       body += chunk;		
    	}
    	else {
    		body = chunk;
    	}
    });

    request.on('error', function(err) {
    	callbackError(err);
    });

    request.on('end', function(){
    	callbackSuccess(body);
 	});


}

function handleResponse(response) {

	return {
		ok: function(data) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			if(data) {
	    	    response.write(data);
			}
	        response.end();
		},
		notfound: function() {
			response.writeHead(404, { 'Content-Type': 'text/plan' });
	        response.end();
		},
		error: function() {
			response.writeHead(500, { 'Content-Type': 'text/plan' });
	        response.end();
		}

	};

}



cacheApp.get('/', handleGET);
cacheApp.post('/', handlePOST);
cacheApp.put('/', handlePUT);