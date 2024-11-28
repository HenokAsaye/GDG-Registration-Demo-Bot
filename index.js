import bot from "./bot.js";
import { addApplication, admin_handler } from "./src/commands/admin.js";
import { start_handler } from "./src/commands/start.js";
import { menuHandler } from "./src/commands/mainMenu.js";
import { connectToDb } from "./src/utils/database.js";
import { AdminCheck } from "./src/middleware/auhtMiddkeware.js";
import { DetailAboutTheOffer } from "./src/commands/offeringDetail.js";

console.log('Starting bot setup...');

bot.command(['start'], start_handler);
console.log('Start command registered');
menuHandler(bot);
console.log('Main menu handler registered');
bot.command(['admin'],AdminCheck,(ctx)=>{
    addApplication(ctx),
    admin_handler(bot)
})
DetailAboutTheOffer(bot)
console.log('Admin handler registered');
(async () => {
    try {
        console.log('Connecting to the database...');
        const db = await connectToDb();
        console.log('Database connection established');

        console.log('Launching bot...');
        bot.launch().catch((error) => {
            console.error('Error during bot launch:', error);
        });
        
        console.log('Bot is running...');
    } catch (error) {
        console.error('Failed to connect to the database or launch the bot:', error);
    }
})();


process.once('SIGINT', async () => {
    await bot.stop('SIGINT');
    console.log('Bot stopped due to SIGINT');
});

process.once('SIGTERM', async () => {
    await bot.stop('SIGTERM');
    console.log('Bot stopped due to SIGTERM');
});
