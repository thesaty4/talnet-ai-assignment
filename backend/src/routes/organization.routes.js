 
 
const express = require('express');
// const { keyCloak } = require("../middleware/keyCloak.middleware");

const router = express.Router();
const OrganizationController = require('../controllers/organization.controller');

// POST /api/organizations - Create a new organization
router.post('/', OrganizationController.createOrganization);

// GET /api/organizations - Get all organizations
router.get('/', OrganizationController.getOrganizations);

module.exports = router;