import { getMainmenu,openPositions,applyOrCallBack } from "../utils/replyhandler.js";
import Position from "../models/offerModel.js";


export const DetailAboutTheOffer = (bot)=>{
    bot.action(/^[a-f0-9]{24}$/, async (ctx) => { 
        try {
            const positionId = ctx.match[0];
            const position = await Position.findById(positionId);

            if (!position) {
                return ctx.reply("Application not found.", getMainmenu());
            }

            const descriptionText = `**${position.title}**\n\n${position.description}`;
            ctx.replyWithMarkdown(descriptionText, applyOrCallBack(position.applyLink || "#"));
        } catch (error) {
            console.error("Error fetching position details:", error);
            ctx.reply("An error occurred while fetching application details.");
        }
        
        });
    bot.action('backtomenu',async(ctx)=>{
        ctx.reply("Mainmenu",getMainmenu())
    })
}