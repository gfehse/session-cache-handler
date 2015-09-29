'use strict';
(function() {

	var NodeCache = require( "node-cache" );

	var cacheAPI = module.exports =  
	{
	// setting default ttl to 3 minutes
	sessionCache : new NodeCache({checkperiod: 1 }),
	ttl: 30, // default ttl

	readCache : function(sessionId) {
		return this.sessionCache.get(sessionId);
	},
	
	storeCache : function(sessionId, userId) {
		return this.sessionCache.set(sessionId, userId, this.ttl);
	},

	updateTTL : function(sessionId) {
		return this.sessionCache.ttl(sessionId, this.ttl);
	},

	deleteCache : function(sessionId) {
		return this.sessionCache.del(sessionId);
	}

	};

	cacheAPI.sessionCache.on( "expired", function( key, value ){
    	console.log('expired! key=['+key + '], value=['+value+']');   
	});

	return cacheAPI;


})();

