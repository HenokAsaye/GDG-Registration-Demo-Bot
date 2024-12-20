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
                return Markup.button.callback(position.title,position._id.toString())
            }
        )
    )
}
export const applyOrCallBack = (link) => {
    if (!link) {
        return Markup.inlineKeyboard([
            [Markup.button.callback('No Apply Link Available', 'noLink')],
            [Markup.button.callback('BackToMenu', 'backtomenu')],
        ]);
    }
    return Markup.inlineKeyboard([
        [Markup.button.url('Apply', link)], 
        [Markup.button.callback('BackToMenu', 'backtomenu')],
    ]);
};




export const adminFunctionality = ()=>{
    return Markup.inlineKeyboard([
        [Markup.button.callback('Title',"addTitle")],
        [Markup.button.callback('Descrition','addDescription')],
        [Markup.button.callback('Requirements',"addRequirements")],
        [Markup.button.callback('CloseTime','addClosingTime')],
        [Markup.button.callback('Link','applyLink')],
        [Markup.button.callback('Done','FinishAdding')]
    ])
}




