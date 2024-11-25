import { getMainMenu,openPositions } from "./admin.js";
import Position from "../models/offerModel.js"



export const menuHandler = (bot)=>{
    try {
        bot.action('Applications',async(ctx)=>{
            const position = await Position.find({status:'draft',closingTime:closingtime > Date.now()})
            if(position.length ===0){
                return ctx.reply('No Application is Open BY Now!',getMainMenu())
            }
            ctx.reply("Applications That are open Now Are",openPositions(position))
        })
    } catch (error) {
        console.log('error while fetcing the data',error)
        throw new Error('Error while fetching the data')
    }

}