const monk = require('monk');
const connectionString = process.env.MONGODB_URI;
const db = monk(connectionStrIing);

module.exports = db;