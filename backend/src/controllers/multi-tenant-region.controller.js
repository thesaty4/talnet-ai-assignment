const RegionalOffice = require("../models/region.model");
const Organization = require("../models/organization.model");

class MultiTenantRegionController {
  // Get all regional offices with their associated organization details (joined data)
  static async getAllRegionsWithOrgDetails(req, res) {
    try {
      // Fetch all regional offices and include associated organization details
      const regionsWithOrg = await RegionalOffice.findAll({
        include: [
          {
            model: Organization,
            attributes: ["id", "name", "realm"], // Only fetch specific fields from Organization
          },
        ],
        attributes: [
          "id",
          "name",
          "organizationId",
          "keycloakGroupId",
          "createdAt",
          "updatedAt",
        ],  
      });

      // If no regional offices are found, return an empty array
      if (!regionsWithOrg || regionsWithOrg.length === 0) {
        return res.status(200).json([]);
      }

      // Return the joined data
      return res.status(200).json(regionsWithOrg);
    } catch (error) {
      console.error(
        "Error fetching joined regional offices and organizations:",
        error
      );
      return res.status(500).json({ error: "Failed to fetch joined data" });
    }
  }
}

// Exporting the controller
module.exports = MultiTenantRegionController;
