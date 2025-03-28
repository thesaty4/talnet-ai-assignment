const RegionalOffice = require("../models/region.model");
const Organization = require("../models/organization.model");
const { sequelize } = require("../config/db.config"); // Import sequelize for transaction

/**@deprecated for some reason, this is not giving latest data
 * Need to debug it
 */
class MultiTenantRegionController {
  // Get all regional offices with their associated organization details (joined data), grouped by organizationId with pagination
  static async getAllRegionsWithOrgDetails(req, res) {
    try {
      // Parse pagination query parameter (e.g., pagination=true or pagination=false)
      const isPagination =
        req.query.pagination === "true"
          ? true
          : req.query.pagination === "false"
          ? false
          : true;
      console.log("isPagination****", isPagination);

      // Extract pagination parameters from query (default: page=1, limit=10)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Fetch total count of regional offices for pagination metadata
      const totalCount = await Organization.count();

      // Fetch regional offices with pagination and include associated organization details
      const regionsWithOrg = await Organization.findAll({
        include: [
          {
            model: RegionalOffice, // No alias required
            attributes: [
              "id",
              "name",
              "organizationId",
              "keycloakGroupId",
              "createdAt",
              "updatedAt",
            ],
            required: false, // Left join (include organizations without regional offices)
          },
        ],
        attributes: ["id", "name", "realm", "createdAt", "updatedAt"],
        ...(isPagination && { limit, offset }),
        raw: true,
        nest: true,
      });

      // grouping the data, so that we can have organization and its regional offices
      const groupedData = Object.values(
        regionsWithOrg.reduce(
          (acc, { id, name, realm, RegionalOffices, ...rest }) => {
            if (!acc[id]) {
              acc[id] = {
                organization: { id, name, realm, ...rest },
                regions: [],
              };
            }
            if (RegionalOffices?.id) {
              acc[id].regions.push(RegionalOffices);
            }
            return acc;
          },
          {}
        )
      );

      groupedData.forEach((group) => {
        group.regions = group.regions.reverse();
      });

      // Return the grouped data with pagination metadata (if pagination is enabled)
      return res.status(200).json({
        data: groupedData.reverse(),
        ...(isPagination && {
          pagination: {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            pageSize: limit,
          },
        }),
      });
    } catch (error) {
      console.error(
        "Error fetching joined regional offices and organizations:",
        error
      );
      return res.status(500).json({ error: "Failed to fetch joined data" });
    }
  }
}

module.exports = MultiTenantRegionController;
