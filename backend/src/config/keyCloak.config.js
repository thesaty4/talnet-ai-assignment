const KeyCloakAdminClient = require('keycloak-admin').default;
const env = require('./env.config');

let keyCloakAdmin =  new KeyCloakAdminClient({
  baseUrl: env.KEY_CLOAK_URL,
  realmName:   env.KEY_CLOAK_REALM || 'master', // Dynamically use realm from env
});

const initializeKeyCloakAdmin = async (token) => {
  try { 
      await keyCloakAdmin.auth({
        username: env.KEY_CLOAK_ADMIN,
        password: env.KEY_CLOAK_PASSWORD,
        grantType: 'password',
        clientId: 'admin-cli', // each realm have their own clientId, // This would be specific to the organization/tenant
        ...( token && {
          bearerToken: token,
        }),
      });
    
   
    console.log('✅ Keycloak Admin Client initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Keycloak Admin Client:', error);
    throw error;
  }
};

module.exports = { keyCloakAdmin, initializeKeyCloakAdmin };
