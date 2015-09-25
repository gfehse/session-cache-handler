var http = require('http');
var Router = require('router');
var finalhandler = require('finalhandler')
var _url_ = require('url');
var cacheAPI = require('./cacheAPI.js');

// Create the http Server Cache
var router = Router();


var cacheServer = http.createServer(
	function(req, res) {
		router(req,res, finalhandler(req,res));
	});
cacheServer.listen(15000);


function handleGET(request, response) {

	var url = _url_.parse(request.url, true);
	var result = '';
	if(url.query && url.query.sessionId) {
		result = cacheAPI.readCache(url.query.sessionId);

		if(!result) {
			result = 'not found';
		}
	}

	response.writeHead(200, { 'Content-Type': 'text/plain' });

	response.write(result);
	response.end();


}

function handlePOST(request, response) {



}


router.get('/cache/get', handleGET);
router.get('/cache/update', handlePOST);