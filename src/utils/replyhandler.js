import {Markup} from "telegraf";


export const getMainmenu = (ctx)=>{
     Markup.inlineKeyboard([
        [Markup.inlineKeyboard.callback('ApplicationsOpen','Applications')],
        [Markup.inlineKeyboard.callback("About GDG",'aboutGdg')],
        [Markup.inlineKeyboard.callback("Help",'help')]
    ])
};


export const openPositions = (Position)=>{
    Markup.inlineKeyboard(
        Position.map(
            (position)=>{
                Markup.button.callback(position.title,position._id)
            }
        )
    )
}



export const applyOrCallBack = ()=>{

    return Markup.inlineKeyboard([
        [Markup.inlineKeyboard.callback('Apply',link)],
        [Markup.inlineKeyboard.callback('BackToMenu','backtomenu')],
    ])

}



export const adminFunctionality = ()=>{
    return Markup.inlineKeyboard([
        [Markup.inlineKeyboard.callback('Title',"addTitle")],
        [Markup.inlineKeyboard.callback('Descrition','addDescription')],
        [Markup.inlineKeyboard.callback('Requirements',"addRequirements")],
        [Markup.inlineKeyboard.callback('CloseTime','addClosingTime')],
        [Markup.inlineKeyboard.callback('Done','FinishAdding')]
    ])
}




