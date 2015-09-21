'use strict';
(function() {

	var NodeCache = require( "node-cache" );
	// setting default ttl to 3 minutes
	this.sessionCache = new NodeCache({ ttl: 180000, checkperiod: 1000 });

	this.readCache = function(sessionId) {
		return this.sessionCache.get(sessionId);
	}
	
	this.storeCache = function(sessionId, userId, ttl) {
		return this.sessionCache.set(sessionId, userId, ttl);
	}

	this.deleteCache = function(sessionId) {
		return this.sessionCache.del(sessionId);
	};


})();

