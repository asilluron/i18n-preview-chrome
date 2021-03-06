var i18nPort;

chrome.runtime.onConnect.addListener(function (port) {
	if (port.name === "i18nrender") {
		i18nPort = port;
		port.onMessage.addListener(function (msg) {
			if (msg.method == "getLocaleFile")
				setTimeout(function () {
					port.postMessage({
						locale: localStorage.locale_url,
						filebase: localStorage.file_base_url
					});
				}, 200);
		});

	}

});

chrome.history.onVisited.addListener(function (history) {
	i18nPort.postMessage("rerender");
});