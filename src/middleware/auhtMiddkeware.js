import dotenv from "dotenv";
import {Logger} from "../../config.js"
dotenv.config()

export const AdminCheck = async(ctx,next)=>{
    const username = ctx.from?.username
    try {
        if(!username){
            throw new Error("username not found!")
            Logger.error("User Name not found when try to log as Admin")
        }
        if(username == (process.env.admin_username)){
            console.log(username)
            return next()
        }else{
            Logger.info("The username is ",username)
            throw new Error("You are not eligible for this service.")
        }
    
    } catch (error) {
        Logger.error("Error in AdminCheck middleware:", error.message);
        await ctx.reply("An error occurred while processing your request.");
    }
   

}