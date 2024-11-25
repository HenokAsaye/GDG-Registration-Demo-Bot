import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Position from "../models/offerModel.js";
dotenv.config()


const client = new MongoClient(process.env.Mongo_URI)

let db;


export const connectToDb = async()=>{
    try {
        if(!db){
            await client.connect()
            db=client.db("GDGApplication")
        }
    
        return db
    }catch (error) {
        conslole.log("Error while connection to the database")
    }
}



export const markApplicationAsDone = async(adminId)=>{
    const result = await Position.updateOne(
        {createdBy:adminId , status:'draft'},
        {$set:{status:'done'}}
    )

    if(result.modifiedCount == 0){
        throw new Error("No draft Application found for the Admin")
    }
}


export const saveApplicationtoDb = async (adminId, field, value) => {
    try {
        const update = {
            $set: {
                [field]: field === "closingTime" ? new Date(value) : value, 
                createdBy: adminId, 
                status: "draft", 
            },
        };

        const result = await Position.updateOne(
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
