const axios = require('axios');
const env = require('../config/env.config');
const Organization = require('../models/organization.model');
const { keyCloakAdmin, initializeKeyCloakAdmin } = require('../config/keyCloak.config');

class OrganizationController {
  // Create a new organization and KeyCloak realm
  static async createOrganization(req, res) {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Organization name is required' });
      }
  
      // Normalize realm name (e.g., "Acme Corp" -> "acme-corp")
      const realmName = name.toLowerCase().replace(/\s+/g, '-');
  
      // Check if organization already exists
      const existingOrg = await Organization.findOne({ where: { name } });
      if (existingOrg) {
        return res.status(400).json({ error: 'Organization already exists' });
      }

          // Get the Bearer token from request header
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
      }

      console.log('before init.');
      // Dynamically authenticate Keycloak Admin with Bearer token
      await initializeKeyCloakAdmin(token);
  
      console.log('Creating realm in Keycloak...');
      // Create realm in KeyCloak
      await keyCloakAdmin.realms.create({
        realm: realmName,
        enabled: true,
        displayName: name,
        loginTheme: 'keycloak',
        accessTokenLifespan: 3600, // 1 hour
        ssoSessionIdleTimeout: 1800, // 30 minutes
      });


  
      console.log('Realm created successfully in Keycloak');
  
      // Create organization in Postgres
      console.log('Creating organization in Postgres...');
      const organization = await Organization.create({
        name,
        realm: realmName,
      });
  
      console.log('Organization created in Postgres:', organization);
  
      return res.status(201).json({
        message: 'Organization created successfully',
        organization: {
          id: organization.id,
          name: organization.name,
          realm: organization.realm,
        },
      });
    } catch (error) {
      console.error('Error creating organization:', error);
      return res.status(500).json({ error: `Failed to create organization: ${error.message}` });
    }
  }
  

  // Get all organizations
  static async getOrganizations(req, res) {
    try {
      const organizations = await Organization.findAll();
      return res.status(200).json(organizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      return res.status(500).json({ error: 'Failed to fetch organizations' });
    }
  }
}

module.exports = OrganizationController;