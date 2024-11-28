import {Telegraf} from "telegraf";
import dotenv from "dotenv";
dotenv.config();


const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
bot.use(async(ctx,next)=>{
    console.log(`Message from ${ctx.from.username}: ${ctx.message?.text} || ${ctx.callbackQuery}`);
    await next();
})

export default bot;