const RegionalOffice = require('../models/region.model');
const Organization = require('../models/organization.model');
const { sequelize } = require('../config/db.config'); // Import sequelize for transaction

/**@deprecated for some reason, this is not giving latest data
 * Need to debug it
 */
class MultiTenantRegionController { 

  // Get all regional offices with their associated organization details (joined data), grouped by organizationId with pagination
  static async getAllRegionsWithOrgDetails(req, res) {
    try {
      // Parse pagination query parameter (e.g., pagination=true or pagination=false)
      const isPagination = req.query.pagination === 'true' ? true : req.query.pagination === 'false' ? false : true;
      console.log('isPagination****', isPagination);

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
            as: 'organization',
            attributes: ['id', 'name', 'realm'],
            required: false,
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
        ...(isPagination && {
          limit: limit,
          offset: offset,
        }),
        order: [['organizationId', 'ASC'], ['createdAt', 'DESC']], // Sort by createdAt DESC to get latest records first
        raw: true, // Use raw query to avoid Sequelize instance issues
        nest: true, // Ensure nested objects are properly structured
      });

      // Log the raw data to debug
      console.log('Raw regionsWithOrg:', JSON.stringify(regionsWithOrg, null, 2));

      // If no regional offices are found, return an empty response with pagination metadata
      if (!regionsWithOrg || regionsWithOrg.length === 0) {
        return res.status(200).json({
          data: [],
          ...(isPagination && {
            pagination: {
              totalItems: 0,
              totalPages: 0,
              currentPage: page,
              pageSize: limit,
            },
          }),
        });
      }

      // Group the results by organizationId
      const groupedByOrg = regionsWithOrg.reduce((acc, region) => {
        const orgId = region.organizationId;
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

      // Return the grouped data with pagination metadata (if pagination is enabled)
      return res.status(200).json({
        data: groupedData,
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
      console.error('Error fetching joined regional offices and organizations:', error);
      return res.status(500).json({ error: 'Failed to fetch joined data' });
    }
  }
}

module.exports = MultiTenantRegionController;