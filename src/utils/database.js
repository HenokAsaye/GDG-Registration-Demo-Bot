import moment from 'moment';  
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.Mongo_URI);
let db;

export const connectToDb = async () => {
    try {
        if (!db) {
            await client.connect();
            db = client.db("GDGApplication");
            console.log("Database connection established");
            await setupSchemaValidation(db);
        }
        return db;
    } catch (error) {
        console.error("Error while connecting to the database:", error);
        throw error;
    }
};

export const getDb = () => db;


const setupSchemaValidation = async (db) => {
    try {
        const schema = {
            bsonType: "object",
            required: ["title", "description", "requirements", "closingTime", "createdBy", "status"],
            properties: {
                title: { bsonType: "string", description: "Title of the position" },
                description: { bsonType: "string", description: "Description of the position" },
                requirements: { bsonType: "array", items: { bsonType: "string" }, description: "Requirements for the position" },
                closingTime: { bsonType: "date", description: "Application closing time" },
                createdBy: { bsonType: "int", description: "Admin ID who created the position" },
                status: { bsonType: "string", enum: ["draft", "done"], description: "Application status" },
            },
        };
        await db.createCollection("positions", {
            validator: {
                $jsonSchema: schema,
            },
            validationAction: "warn", 
        });

        console.log("Schema validation for the 'positions' collection set up successfully.");
    } catch (error) {
        console.error("Error setting up schema validation:", error);
    }
};
export default db;
export const saveApplicationtoDb = async (adminId, field, value) => {
    try {
        const update = {
            $set: {
                [field]: field === "closingTime" ? 
                          moment(value, "DD/MM/YYYY", true).startOf('day').toDate() : value,  
                createdBy: adminId, 
                status: "draft",
            },
        };

        const result = await db.collection('positions').updateOne(
            { createdBy: adminId, status: "draft" }, 
            update,
            { upsert: true } 
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            throw new Error("Failed to update or create the application.");
        }
    } catch (error) {
        console.error("Error saving application data:", error);
        throw error;
    }
};
export const markApplicationAsDone = async (adminId) => {
    const draft = await db.collection("positions").findOne({ createdBy: adminId, status: "draft" });
    if (!draft) throw new Error("No draft application found for the admin.");
    
    const requiredFields = ["title", "Description", "Requirements", "ClosingTime"];
    
    for (const field of requiredFields) {
        if (!draft[field]) {
            throw new Error(`The field '${field}' is missing. Please complete the application.`);
        }
        
        if (field === "closingTime" && isNaN(new Date(draft[field]))) {
            throw new Error("The closing time is invalid. Please enter a valid date.");
        }
    }

    const result = await db.collection("positions").updateOne(
        { createdBy: adminId, status: "draft" },
        { $set: { status: "done" } }
    );

    if (result.modifiedCount === 0) {
        throw new Error("Failed to mark the application as done.");
    }
};