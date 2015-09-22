'use strict';
(function() {

	var NodeCache = require( "node-cache" );

	return {
	// setting default ttl to 3 minutes
	sessionCache : new NodeCache({ ttl: 180000, checkperiod: 1000 }),

	readCache : function(sessionId) {
		return this.sessionCache.get(sessionId);
	},
	
	storeCache : function(sessionId, userId, ttl) {
		return this.sessionCache.set(sessionId, userId, ttl);
	},

	deleteCache : function(sessionId) {
		return this.sessionCache.del(sessionId);
	}

	};


})();

