import bot from "./bot.js"
import {addApplication, admin_handler} from  "./src/commands/admin.js"
import {start_handler} from "./src/commands/start.js"


bot.command(['start'], start_handler);
admin_handler(bot);


bot.launch().then(() => {
    console.log('Bot is running...');
});


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
