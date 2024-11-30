import { getMainmenu, applyOrCallBack } from "../utils/replyhandler.js";
import { connectToDb } from "../utils/database.js";
import { ObjectId } from "mongodb";

export const DetailAboutTheOffer = (bot) => {
    bot.action(/^[a-f0-9]{24}$/, async (ctx) => {
        try {

            const db = await connectToDb();
            const positionCollection = db.collection('newPositions');
            const positionId = ctx.callbackQuery.data; 
            console.log("Client Action Triggered:", positionId);
            const position = await positionCollection.findOne({ _id: new ObjectId(positionId) });
            if (!position) {
                ctx.answerCbQuery();
                return ctx.reply("Application not found.", getMainmenu());
            }

            ctx.answerCbQuery();
            const descriptionText = `**${position.title}**\n\n${position.Requirements || 'No description available.'}`;
            console.log("Fetched Position:", position);
            ctx.replyWithMarkdown(descriptionText, applyOrCallBack(position.Link));
        } catch (error) {
            console.error("Error fetching position details:", error);
            ctx.reply("An error occurred while fetching application details.");
        }
    });

    bot.action('backtomenu', async (ctx) => {
        console.log("Client Action Triggered: backtomenu");
        ctx.reply("Mainmenu", getMainmenu());
        ctx.answerCbQuery()
    });
};
