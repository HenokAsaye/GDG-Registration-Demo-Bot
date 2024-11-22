import { adminFunctionality } from "../utils/replyhandler.js";
import { saveApplicationtoDb } from "../utils/database.js";
import { markApplicationAsDone } from "../utils/database.js";

const adminStatus = {}; 

export const addApplication = (ctx) => {
    ctx.reply(`Add the Applications that will be Open Soon`, adminFunctionality);
};

export const admin_handler = (bot) => {
    bot.action("title", (ctx) => {
        ctx.reply("Enter the title of the Application:");
        adminStatus[ctx.from.id] = { action: "title" };
        ctx.answerCbQuery();
    });

    bot.action("Description", (ctx) => {
        ctx.reply("Add the description about the Application:");
        adminStatus[ctx.from.id] = { action: "Description" };
        ctx.answerCbQuery();
    });

    bot.action("Requirements", (ctx) => {
        ctx.reply("Add the requirements for the Application:");
        adminStatus[ctx.from.id] = { action: "Requirements" };
        ctx.answerCbQuery();
    });

    bot.action("ClosingTime", (ctx) => {
        ctx.reply("Add the deadline for the Application:");
        adminStatus[ctx.from.id] = { action: "ClosingTime" };
        ctx.answerCbQuery();
    });
    bot.action("FinishAdding",async(ctx)=>{
        try {
            await markApplicationAsDone(ctx.from.id)
            ctx.reply("The application has been successfully finalized and marked as 'done'.")
        } catch (error) {
            ctx.reply("An error occurred while finalizing the application. Please try again.");
            console.error(error);
        }
        adminStatus[ctx.from.id] = null;
        answerCbQuery("You have Done you Process!")
    })
    bot.on("text", async(ctx) => {
        const adminAction = adminStatus[ctx.from.id];

        if (!adminAction) {
            ctx.reply("No action is currently active. Please choose an option.");
            return;
        }

        const fieldMap = {
            title: "Title",
            Description: "Description",
            Requirements: "Requirements",
            ClosingTime: "Closing Time",
            FinishAdding:'FinishAddding'
        };
        const adminId = ctx.from.id
        const field = adminAction.action;
        const value = ctx.message.text;
        if(fieldMap[field]){
            try {
                await saveApplicationtoDb(adminId,field,value)
                ctx.reply(`The ${field} is set with ${value}`)
            } catch (error) {
                ctx.reply("An error occurred while saving the data. Please try again.");
                console.error(error);
            }
        }else{
            ctx.reply("Unkown Action,Please Try Again")
        }
        delete adminStatus[ctx.from.id];
    });
};
