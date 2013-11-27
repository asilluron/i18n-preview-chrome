chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocaleFile")
      sendResponse({data: localStorage["locale_url"]});
    else
      sendResponse({}); // snub them.
});