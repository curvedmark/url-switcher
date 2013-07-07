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
		if (event.ctrlKey || event.metaKey || event.shiftKey) return;
		var a = event.target;
		chrome.tabs.update(tab.id, { url: a.href });
		window.close();
	};
});