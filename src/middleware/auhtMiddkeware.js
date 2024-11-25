import dotenv from "dotenv";
dotenv.config()

export const AdminCheck = async(ctx,next)=>{
    const username = ctx.message?.from?.username
    try {
        if(!username){
            throw new Error("username not found!")
        }
    
        if(username === process.env.admin_username){
            return next()
        }else{
            throw new Error("You are not eligible for this service.")
        }
    
    } catch (error) {
        console.error("Error in AdminCheck middleware:", error.message);
        await ctx.reply("An error occurred while processing your request.");
    }
   

}