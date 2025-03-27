const RegionalOffice = require('../models/region.model');
const Organization = require('../models/organization.model');

class MultiTenantRegionController {
  // Get all regional offices with their associated organization details (joined data), grouped by organizationId with pagination
  static async getAllRegionsWithOrgDetails(req, res) {
    try {
      // Extract pagination parameters from query (default: page=1, limit=10)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Fetch total count of regional offices for pagination metadata
      const totalCount = await RegionalOffice.count();

      // Fetch regional offices with pagination and include associated organization details
      const regionsWithOrg = await RegionalOffice.findAll({
        include: [
          {
            model: Organization,
            as: 'organization', // Use the alias defined in the association
            attributes: ['id', 'name', 'realm'],
            required: false, // Left join to include regional offices even if the organization is missing
          },
        ],
        attributes: [
          'id',
          'name',
          'organizationId',
          'keycloakGroupId',
          'createdAt',
          'updatedAt',
        ],
        limit: limit,
        offset: offset,
        order: [['organizationId', 'ASC'], ['createdAt', 'ASC']],
      });

      // If no regional offices are found, return an empty response with pagination metadata
      if (!regionsWithOrg || regionsWithOrg.length === 0) {
        return res.status(200).json({
          data: [],
          pagination: {
            totalItems: 0,
            totalPages: 0,
            currentPage: page,
            pageSize: limit,
          },
        });
      }

      // Group the results by organizationId
      const groupedByOrg = regionsWithOrg.reduce((acc, region) => {
        const orgId = region.organizationId;
        // Skip if the organization is missing (e.g., orphaned record)
        if (!region.organization) {
          console.warn(`Regional office ${region.id} has no associated organization (organizationId: ${orgId})`);
          return acc;
        }
        if (!acc[orgId]) {
          acc[orgId] = {
            organization: {
              id: region.organization.id,
              name: region.organization.name,
              realm: region.organization.realm,
            },
            regions: [],
          };
        }
        acc[orgId].regions.push({
          id: region.id,
          name: region.name,
          organizationId: region.organizationId,
          keycloakGroupId: region.keycloakGroupId,
          createdAt: region.createdAt,
          updatedAt: region.updatedAt,
        });
        return acc;
      }, {});

      // Convert grouped object to array format
      const groupedData = Object.values(groupedByOrg);

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);

      // Return the grouped data with pagination metadata
      return res.status(200).json({
        data: groupedData,
        pagination: {
          totalItems: totalCount,
          totalPages: totalPages,
          currentPage: page,
          pageSize: limit,
        },
      });
    } catch (error) {
      console.error('Error fetching joined regional offices and organizations:', error);
      return res.status(500).json({ error: 'Failed to fetch joined data' });
    }
  }
}

module.exports = MultiTenantRegionController;