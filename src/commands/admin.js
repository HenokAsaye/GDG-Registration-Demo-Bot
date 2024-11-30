import { adminFunctionality } from "../utils/replyhandler.js";
import { saveApplicationtoDb } from "../utils/database.js";
import { markApplicationAsDone } from "../utils/database.js";
import moment from "moment"

const adminStatus = {}; 

export const addApplication = (ctx) => {
    ctx.reply(`Add the Applications that will be Open Soon`, adminFunctionality());
};

export const admin_handler = (bot) => {
    bot.action("addTitle", (ctx) => {
        ctx.reply("Enter the title of the Application:");
        adminStatus[ctx.from.id] = { action: "title" };
        ctx.answerCbQuery();
    });

    bot.action("addDescription", (ctx) => {
        ctx.reply("Add the description about the Application:");
        adminStatus[ctx.from.id] = { action: "Description" };
        ctx.answerCbQuery();
    });

    bot.action("addRequirements", (ctx) => {
        ctx.reply("Add the requirements for the Application:");
        adminStatus[ctx.from.id] = { action: "Requirements" };
        ctx.answerCbQuery();
    });

    bot.action("applyLink", (ctx) => {
        ctx.reply("Add the link where applicants can apply:");
        adminStatus[ctx.from.id] = { action: "Link" };
        ctx.answerCbQuery();
    });

    bot.action("addClosingTime", (ctx) => {
        ctx.reply("Add the deadline for the Application (format: DD/MM/YYYY):");
        adminStatus[ctx.from.id] = { action: "ClosingTime" };
        ctx.answerCbQuery();
    });

    bot.action("FinishAdding", async (ctx) => {
        try {
            await markApplicationAsDone(ctx.from.id);
            ctx.reply("The application has been successfully finalized and marked as 'done'.");
        } catch (error) {
            ctx.reply(`An error occurred: ${error.message}`);
            console.error(error);
        }
        adminStatus[ctx.from.id] = null;
        ctx.answerCbQuery("You have completed your process!");
    });

    bot.on("text", async (ctx) => {
        const adminAction = adminStatus[ctx.from.id];

        if (!adminAction) {
            ctx.reply("No action is currently active. Please choose an option.");
            return;
        }

        const fieldMap = {
            title: "Title",
            Description: "Description",
            Requirements: "Requirements",
            Link: "Link",
            ClosingTime: "ClosingTime",
        };

        const adminId = ctx.from.id;
        const field = adminAction.action;
        const value = ctx.message.text;

        if (field === "ClosingTime") {
            const closingTime = moment(value, "DD/MM/YYYY", true);

            if (!closingTime.isValid()) {
                ctx.reply("The closing time format is invalid. Please use 'DD/MM/YYYY' format.");
                return;
            }
            const closingTimeDate = closingTime.startOf("day").toDate();
            await saveApplicationtoDb(adminId, field, closingTimeDate);
            ctx.reply(`The ${field} is set to ${closingTime.format("DD/MM/YYYY")}`);
        } else if (fieldMap[field]) {
            try {
                await saveApplicationtoDb(adminId, field, value);
                ctx.reply(`The ${field} is set to "${value}"`);
            } catch (error) {
                ctx.reply("An error occurred while saving the data. Please try again.");
                console.error(error);
            }
        } else {
            ctx.reply("Unknown Action. Please Try Again.");
        }

        delete adminStatus[ctx.from.id];
    });
};
