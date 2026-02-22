require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        const adminEmail = 'admin@finrl.ai';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin already exists.');
            process.exit(0);
        }

        const admin = new User({
            email: adminEmail,
            password: 'adminpassword123', // Will be hashed by pre-save hook
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@finrl.ai');
        console.log('Password: adminpassword123');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedAdmin();
