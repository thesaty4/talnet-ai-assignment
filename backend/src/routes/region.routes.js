const express = require("express");
const router = express.Router();

const { keyCloak } = require("../middleware/keyCloak.middleware");
const RegionalOfficeController = require('../controllers/region.controller');

// POST /api/regional-offices - Create a new regional office
router.post('/', RegionalOfficeController.createRegionalOffice);

// GET /api/regional-offices/:organizationId - Get all regional offices for an organization
router.get('/:organizationId', RegionalOfficeController.getRegionalOffices);
 
module.exports = router;