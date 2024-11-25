import { Markup } from 'telegraf';

export const getMainmenu = () => {
    return Markup.inlineKeyboard([
        [Markup.button.callback('Applications Open', 'Applications')],
        [Markup.button.callback("About GDG", 'aboutGdg')],
        [Markup.button.callback("Help", 'help')],
  
    ]);
};



export const openPositions = (Position)=>{
    return Markup.inlineKeyboard(
        Position.map(
            (position)=>{
                Markup.button.callback(position.title,position._id)
            }
        )
    )
}



export const applyOrCallBack = ()=>{

    return Markup.inlineKeyboard([
        [Markup.button.callback('Apply',link)],
        [Markup.button.callback('BackToMenu','backtomenu')],
    ])

}



export const adminFunctionality = ()=>{
    return Markup.inlineKeyboard([
        [Markup.button.callback('Title',"addTitle")],
        [Markup.button.callback('Descrition','addDescription')],
        [Markup.button.callback('Requirements',"addRequirements")],
        [Markup.button.callback('CloseTime','addClosingTime')],
        [Markup.button.callback('Done','FinishAdding')]
    ])
}




