chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

    //build out requests
    switch(request.method){
        case "getLocaleFile":
            sendResponse({data: localStorage["locale_url"]});
            break;

        default:
            sendResponse({}); // snub them.
            break;
    }
});