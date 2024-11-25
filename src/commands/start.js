import { getMainmenu } from "../utils/replyhandler.js";

const welcomeMsg = `Welcome to GDG Registration Bot! Here you can find the open applications for GDG.`;

export const start_handler = (ctx) => {
    ctx.reply(welcomeMsg,getMainmenu());
};
