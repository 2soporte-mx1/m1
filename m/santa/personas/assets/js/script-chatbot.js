const showEventsInConsole = true;
var answer = "";
if (showEventsInConsole) {
    document.addEventListener('VIRTUAL_ASSISTANT_CHATBOT', function(e) {
        console.log('Virtual Assistant Chatbot event caught with this detail:', JSON.stringify(e.detail));
        // Do want you need to do with each event here
        if(e.detail.EventName.includes("conversation_history_update")){
            let size = e.detail.ConversationHistory.length;
            window.answer = e.detail.ConversationHistory[size-1];
            if( (window.answer.answer.content instanceof Object) && (typeof window.answer.answer.content.tracking) === "object"){
                document.querySelector("va-chatbot").setAttribute("context", '{"page_name": "NEW_PAGE", "title":"'+ window.answer.answer.content.title+ '"' + ' ,"rate_code":"'+ window.answer.answer.content.tracking.rateCode +'"}');
            }
        }                  
    });
}