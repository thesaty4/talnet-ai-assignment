const { keyCloak } = require('../config/keyCloak.config');

/**
 * Service handling business logic for organization management.
 */
class OrganizationService {
  /**
   * Creates a new organization in keyCloak as a realm.
   * @param {string} name - Name of the organization.
   * @returns {Promise<Object>} - Created realm details.
   */
  static async createOrganization(name) {
    const realmId = name.toLowerCase().replace(/\s+/g, '-');

    try {
      await keyCloak.realms.create({
        id: realmId,
        realm: realmId,
        enabled: true,
      });
      return { message: `Realm ${realmId} created successfully` };
    } catch (error) {
      throw new Error(`Failed to create realm: ${error.message}`);
    }
  }
}

module.exports = OrganizationService;
