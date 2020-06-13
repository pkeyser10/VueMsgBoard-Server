const monk = require('monk');
const connectionString = process.env.MONGODB_UR || 'localhost/messageboard';
const db = monk(connectionStrIing);

module.exports = db;