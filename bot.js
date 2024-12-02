import {Telegraf} from "telegraf";
import dotenv from "dotenv";
import {Logger} from './config.js'
dotenv.config();


const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
bot.use(async(ctx,next)=>{
    Logger.info(`Message from ${ctx.from.username}: ${ctx.message?.text} || ${ctx.callbackQuery}`);
    await next();
})

export default bot;