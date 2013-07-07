var output = document.getElementById('output');

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	var tab = tabs[0];
	var url = new Url(tab.url);
	var urls = url.hierarchize();
	var html = urls.map(function (url) {
		return '<a href="' + url + '">' + url.toShortString() + '</a>';
	}).join('');
	output.innerHTML = html;

	output.onclick = function (event) {
		var a = event.target;

		// chrome opens web link with modifier keys pressed in popup automatically
		if (a.protocol !== 'file:'&& (event.ctrlKey || event.metaKey || event.shiftKey)) return;

		if (event.ctrlKey || event.metaKey) {
			chrome.tabs.create({ url: a.href, active: event.shiftKey });
		} else if (event.shiftKey) {
			chrome.windows.create({ url: a.href });
		} else {
			chrome.tabs.update(tab.id, { url: a.href });
		}

		window.close();
	};
});