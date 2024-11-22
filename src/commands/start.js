import { getMainmenu } from "../utils/replyhandler.js";


 const welcomeMSg = `Welcome to GdG Registration Bot Here you can find the open Application for GDG`

export const start_handler = (ctx)=>{
    ctx.reply(welcomeMSg)
    ctx.reply(getMainmenu)
}