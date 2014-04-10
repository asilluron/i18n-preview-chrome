var port = chrome.runtime.connect({
    name: "i18nrender"
}), lastUsedLocaleFile;


port.postMessage({
    method: "getLocaleFile"
});

port.onMessage.addListener(function (response) {
    if(response.locale){
        lastUsedLocaleFile = response.filebase + response.locale + ".json";
        render(lastUsedLocaleFile);
    }
    else if(response === "rerender"){
        //Proceed with re-rendering
        render(lastUsedLocaleFile);
    }
});


function render(fileUrl) {
    if (fileUrl) {
        ajaxRequest("GET", fileUrl, function (response) {
            var resp = JSON.parse(response);
            findAndReplaceDOMText(document.documentElement, {
                find: /<%=([\s\S]+?)%>/g,
                replace: function (elem) {
                    return _.template(elem.text, resp);
                }
            });
        }, function (error) {
            console.error(error);
        });
    }
}