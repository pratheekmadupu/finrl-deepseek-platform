// In-memory data store for the demo
// Pre-seeded with an admin account for convenience
const bcrypt = require('bcryptjs');

const users = [
    {
        id: 'admin_demo',
        email: 'admin@finrl.ai',
        // Password is 'admin123' hashed
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        createdAt: new Date()
    },
    {
        id: 'analyst_1',
        email: 'analyst1@mgx.world',
        password: bcrypt.hashSync('analyst123', 10),
        role: 'user',
        createdAt: new Date()
    },
    {
        id: 'analyst_2',
        email: 'analyst2@mgx.world',
        password: bcrypt.hashSync('analyst123', 10),
        role: 'user',
        createdAt: new Date()
    }
];

const analyses = [];

module.exports = {
    users,
    analyses
};
