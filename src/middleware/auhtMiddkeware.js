import dotenv from "dotenv";
dotenv.config()

export const AdminCheck = async(ctx,next)=>{
    const username = ctx.from?.username
    try {
        if(!username){
            throw new Error("username not found!")
        }
        console.log()
        if(username == (process.env.admin_username)){
            console.log(username)
            return next()
        }else{
            console.log(username)
            console.log(process.env.admin_username)
            throw new Error("You are not eligible for this service.")
        }
    
    } catch (error) {
        console.error("Error in AdminCheck middleware:", error.message);
        await ctx.reply("An error occurred while processing your request.");
    }
   

}