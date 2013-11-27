chrome.extension.sendRequest({
	method: "getLocaleFile"
}, function (response) {
	var fileUrl = response.data;
	render(fileUrl);
});


function render(fileUrl) {
	var xhr = new XMLHttpRequest();
	if(!fileUrl) {
		fileUrl = "http://localhost:8000/src/i18n/lang/en-us.json";
	}
	xhr.open("GET", fileUrl, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var resp = JSON.parse(xhr.responseText);
			findAndReplaceDOMText(document.documentElement, {
				find: /<%=([\s\S]+?)%>/g,
				replace: function (elem) {
					return _.template(elem.text, resp);
				}
			});
		}
	};
	xhr.send();
}