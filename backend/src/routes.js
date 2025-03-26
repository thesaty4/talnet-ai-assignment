const express = require('express')
const orgRoutes = require("./routes/organization.routes");
const regionRoutes = require("./routes/region.routes");
const router = express.Router();

router.use("/organizations", orgRoutes);
router.use("/regional-offices", regionRoutes);
 
module.exports = router;