require('dotenv').config()

/**
 * Environment configuration
 */
const env = {
    PORT: process.env.PORT,
    KEY_CLOAK_URL: process.env.KEY_CLOAK_URL ,
    KEY_CLOAK_ADMIN: process.env.KEY_CLOAK_ADMIN || 'admin',
    KEY_CLOAK_PASSWORD: process.env.KEY_CLOAK_PASSWORD || 'admin',
    KEY_CLOAK_SECRET: process.env.KEY_CLOAK_SECRET,
    KEY_CLOAK_REALM: process.env.KEY_CLOAK_REALM || 'master',

    POSTGRES_USER: process.env.POSTGRES_USER || 'admin',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'admin',
    POSTGRES_DB: process.env.POSTGRES_DB || 'org_management',
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
    POSTGRES_PORT: process.env.POSTGRES_PORT || 5432, // Default PostgreSQL port
    POSTGRES_URI: ''
};

/**
 * Construct the PostgreSQL connection URI
 */
env.POSTGRES_URI = `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;

module.exports = env;
