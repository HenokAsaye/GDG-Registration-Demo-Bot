import { getMainmenu, openPositions } from "../utils/replyhandler.js";
import { connectToDb, getDb } from "../utils/database.js";
const WelcomeMsg = `Welcome to gdg`
export const menuHandler = (bot) => {
    try {
        bot.action('Applications', async (ctx) => {
            try {
                const db = await connectToDb(); 
                const positionCollection = db.collection('positions');
                const currentDate = new Date();
                const openPositionsList = await positionCollection.find({ status: 'done', closingTime: { $gt: currentDate } }).toArray();

                if (openPositionsList.length === 0) {
                    ctx.answerCbQuery()
                    return ctx.reply("There is not an open position currently", getMainmenu());
                }
                ctx.reply("Open positions currently are", openPositions(openPositionsList));
                await ctx.answerCbQuery("Here are the applications that are open.");
            } catch (error) {
                console.error("Error while finding open positions", error);
                ctx.reply("Error while finding the open positions. Please try again.");
                ctx.answerCbQuery();
            }
        });
        bot.action('aboutGdg',async(ctx)=>{
            ctx.reply(WelcomeMsg,getMainmenu())
            ctx.answerCbQuery()
        })
        bot.action('help',async(ctx)=>{
            ctx.reply('help',getMainmenu())
            ctx.answerCbQuery()
        })
    } catch (error) {
        console.error('Error while setting up the menu handler', error);
    }
};
