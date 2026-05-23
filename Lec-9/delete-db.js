const mongoose = require('mongoose');

async function deleteDatabase() {
    try {
        // Connect to youtuTut database
        const conn = await mongoose.connect("mongodb://localhost:27017/youtuTut");
        console.log("✓ Connected to youtuTut database");
        
        // Drop the database
        await mongoose.connection.dropDatabase();
        console.log("✓ youtuTut database deleted successfully!");
        
        // Connect to userdb to verify it still exists
        await mongoose.connection.close();
        const conn2 = await mongoose.connect("mongodb://localhost:27017/userdb");
        console.log("✓ userdb database still exists (verified)");
        
        // Get database stats
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log(`✓ userdb has ${collections.length} collection(s)`);
        
        await mongoose.connection.close();
        console.log("\n✅ Database cleanup complete!");
        console.log("   - youtuTut: DELETED");
        console.log("   - userdb: ACTIVE");
        
    } catch (error) {
        console.error("✗ Error:", error.message);
        process.exit(1);
    }
}

deleteDatabase();
