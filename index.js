import bot from "./bot.js";
import { addApplication, admin_handler } from "./src/commands/admin.js";
import { start_handler } from "./src/commands/start.js";
import { menuHandler } from "./src/commands/mainMenu.js";
import { connectToDb } from "./src/utils/database.js";
import { AdminCheck } from "./src/middleware/auhtMiddkeware.js";
import { DetailAboutTheOffer } from "./src/commands/offeringDetail.js";
import {Logger} from "./config.js";
import db from "./src/utils/database.js"

console.log('Starting bot setup...');

bot.command(['start'], start_handler);
Logger.info('Start command registered');
menuHandler(bot);
Logger.info('Main menu handler registered');
bot.command(['admin'],AdminCheck,(ctx)=>{
    addApplication(ctx),
    admin_handler(bot)
})
DetailAboutTheOffer(bot)
Logger.info('Admin handler registered');
(async () => {
    try {
        Logger.info('Connecting to the database...');
        const db = await connectToDb();
        Logger.info('Database connection established');

        Logger.info('Launching bot...');
        bot.launch().catch((error) => {
            Logger.error('Error during bot launch:', error);
        });
        
        console.log('Bot is running...');
    } catch (error) {
        Logger.error('Failed to connect to the database or launch the bot:', error);
    }
})();


process.once('SIGINT', async () => {
    await bot.stop('SIGINT');
    Logger.info('Bot stopped due to SIGINT');
});

process.once('SIGTERM', async () => {
    await bot.stop('SIGTERM');
    Logger.info('Bot stopped due to SIGTERM');
});
