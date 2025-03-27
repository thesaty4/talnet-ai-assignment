const express = require('express')
const orgRoutes = require("./routes/organization.routes");
const regionRoutes = require("./routes/region.routes");
const mtrRoutes = require("./routes/multi-tenant-region.route");
const router = express.Router();

router.use("/organizations", orgRoutes);
router.use("/regional-offices", regionRoutes);
router.use("/multi-tenant-region", mtrRoutes);
 
module.exports = router;