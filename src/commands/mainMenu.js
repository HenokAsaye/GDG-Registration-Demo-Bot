import { getMainmenu } from "../utils/replyhandler.js";
import { admin_handler } from "./admin.js";



export const menuHandler = (bot)=>{
    bot.action('Open Application',(ctx)=>{
        ctx.reply("Here are The Application Opened By now")

    })
}