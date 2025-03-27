const {
  keyCloakAdmin,
  initializeKeyCloakAdmin,
} = require("../config/keyCloak.config");
const RegionalOffice = require("../models/region.model");
const Organization = require("../models/organization.model");

class RegionalOfficeController {
  // Create a new regional office within an organization
  static async createRegionalOffice(req, res) {
    try {
      const { organizationId, name } = req.body;

      if (!organizationId || !name) {
        return res
          .status(400)
          .json({ error: "Organization ID and name are required" });
      }

      // Check if the organization exists
      const organization = await Organization.findByPk(organizationId);
      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      // Check if a regional office with the same name already exists in this organization
      const existingOffice = await RegionalOffice.findOne({
        where: { organizationId, name },
      });
      if (existingOffice) {
        return res
          .status(400)
          .json({
            error: "Regional office already exists in this organization",
          });
      }

      // Get the Bearer token from the request header
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ error: "Authorization token is missing" });
      }

      // Dynamically authenticate Keycloak Admin with Bearer token and realm
      // console.log('Initializing Keycloak Admin with realm:', organization.realm);
      // await initializeKeyCloakAdmin(token, organization.realm);

      // Check if the realm exists before creating the group
      try {
        await keyCloakAdmin.realms.find({ realm: organization.realm });
        console.log("Realm exists:", organization.realm);
      } catch (error) {
        console.error("Realm not found:", organization.realm);
        return res.status(404).json({ error: "Realm not found in Keycloak" });
      }

      // Create a group in the Keycloak realm for the regional office
      console.log("Creating group in Keycloak...", organization.realm);
      const groupResponse = await keyCloakAdmin.groups.create({
        realm: organization.realm, // Use the realm from the organization
        name, // Regional office name as the group name
      });

      console.log("Group created successfully in Keycloak");

      // Create the regional office in Postgres
      console.log("Creating regional office in Postgres...");
      const regionalOffice = await RegionalOffice.create({
        name,
        organizationId,
        keycloakGroupId: groupResponse.id,
      });

      return res.status(201).json({
        message: "Regional office created successfully",
        regionalOffice: {
          id: regionalOffice.id,
          name: regionalOffice.name,
          organizationId: regionalOffice.organizationId,
          keycloakGroupId: regionalOffice.keycloakGroupId,
        },
      });
    } catch (error) {
      console.error(
        "Error creating regional office:",
        error.response ? error.response.data : error.message
      );
      return res
        .status(500)
        .json({ error: "Failed to create regional office" });
    }
  }

  // Get all regional offices for an organization
  static async getRegionalOffices(req, res) {
    try {
      const { organizationId } = req.params;

      if (!organizationId) {
        return res.status(400).json({ error: "Organization ID is required" });
      }

      const regionalOffices = await RegionalOffice.findAll({
        where: { organizationId },
        include: [{ model: Organization, attributes: ["name", "realm"] }],
      });

      return res.status(200).json(regionalOffices);
    } catch (error) {
      console.error("Error fetching regional offices:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch regional offices" });
    }
  }
}

// Exporting the controller
module.exports = RegionalOfficeController;
