//TODO: need to update to sendMessage since send request is deprecated
chrome.extension.sendRequest({
	method: "getLocaleFile"
}, function (response) {
	var fileUrl = response.data;
	render(fileUrl);
});


function render(fileUrl) {
    if(!fileUrl) {
        fileUrl = "http://localhost:8000/src/i18n/lang/en-us.json";
    }
    ajaxRequest("GET", fileUrl, function(response){
        var resp = JSON.parse(response);
        findAndReplaceDOMText(document.documentElement, {
            find: /<%=([\s\S]+?)%>/g,
            replace: function (elem) {
                return _.template(elem.text, resp);
            }
        });
    }, function(error){
        console.error(error);
    });
}

