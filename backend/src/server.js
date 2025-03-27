const env = require('./config/env.config')
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./config/db.config');
const {  initializeKeyCloakAdmin } = require('./config/keyCloak.config');
const routes = require('./routes');
const { mySession,protectRoute, keyCloak } = require('./middleware/keyCloak.middleware');

const app = express();

// Middleware
// CORS Configuration
app.use(cors({
  origin: '*', // Adjust in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());



app.use(mySession());
app.use(keyCloak.middleware());


/**  Testing route  */
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK1' });
});


/***register all routes here */
app.use('/api/v1', routes);



// Start server
const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to Postgres
    await sequelize.sync({ force: false });
    console.log('Database connected');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();