const env = require('../config/env.config');
const KeyCloak = require('keycloak-connect');
const session = require('express-session');

// Initialize the in-memory session store
const memoryStore = new session.MemoryStore();

// Initialize KeyCloak
const keyCloak = new KeyCloak({
  store: memoryStore,
});

// CeyCloak middleware to protect routes
function protectRoute(req, res, next) {
    keyCloak.protect()(req, res, next);
}

function mySession(){
    return session({
    secret: env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
}

module.exports = { protectRoute,mySession, keyCloak };
