const express = require('express');
const MultiTenantRegionController = require('../controllers/multi-tenant-region.controller');

const router = express.Router();

// Get all regional offices with joined organization details (new route)
router.get('/', MultiTenantRegionController.getAllRegionsWithOrgDetails);


module.exports = router;