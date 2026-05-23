const mongoose = require('mongoose');
const User = require('./models/user');

async function clearAndTest() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://localhost:27017/userdb");
        console.log("✓ Connected to MongoDB");
        
        // Delete all users
        const result = await User.deleteMany({});
        console.log(`✓ Deleted ${result.deletedCount} existing users`);
        
        // Create test user 1
        const user1 = await User.create({
            first_name: "Rajesh",
            last_name: "Kumar",
            email: "rajesh@example.com",
            job_title: "Software Engineer",
            gender: "Male",
            ip_address: "192.168.1.1"
        });
        console.log("✓ User 1 created:", user1._id);
        
        // Create test user 2
        const user2 = await User.create({
            first_name: "Priya",
            last_name: "Singh",
            email: "priya@example.com",
            job_title: "Product Manager",
            gender: "Female",
            ip_address: "192.168.1.2"
        });
        console.log("✓ User 2 created:", user2._id);
        
        // Create test user 3
        const user3 = await User.create({
            first_name: "Arun",
            last_name: "Verma",
            email: "arun@example.com",
            job_title: "DevOps Engineer",
            gender: "Male",
            ip_address: "192.168.1.3"
        });
        console.log("✓ User 3 created:", user3._id);
        
        // Get all users
        const allUsers = await User.find();
        console.log("\n=== ALL USERS IN DATABASE ===");
        console.log(`Total Users: ${allUsers.length}`);
        allUsers.forEach(user => {
            console.log(`- ${user.first_name} ${user.last_name} (${user.email})`);
        });
        
        console.log("\n✓ Database setup complete! Check Compass: mongodb://localhost:27017");
        
        await mongoose.connection.close();
    } catch (error) {
        console.error("✗ Error:", error.message);
        process.exit(1);
    }
}

clearAndTest();
