chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	var url = new Url(tab.url);
	if (url.isHierarchic()) chrome.pageAction.show(tabId);
	else chrome.pageAction.hide(tabId);
});