function Url(url) {
	var a = document.createElement('a');
	a.href = url;

	this.protocol = a.protocol;
	this.hostname = a.hostname;
	this.port = a.port;
	this.pathname = a.pathname;
	this.search = a.search;
	this.hash = a.hash;
}

Url.prototype.isHierarchic = function () {
	switch (this.protocol) {
	case 'http:':
	case 'https:':
	case 'ftp:':
	case 'file:':
		return !this.isSimple();
	}
	return false;
};

Url.prototype.isSimple = function () {
	return !this.search && this.pathname === '/' && this.isSimpleHost();
};

Url.prototype.isSimpleHost = function () {
	return /^(www\.)?[^.]+\.[^.]+\.?$/i.test(this.hostname);
};

Url.prototype.toString = function () {
	var value = '';
	value += this.protocol + '//';
	value += this.hostname;
	if (this.port) value += ':' + this.port;
	value += this.pathname + this.search + this.hash;

	return decodeURI(value);
};

Url.prototype.toShortString = function () {
	var value = '';
	if (this.protocol !== 'http:') value += this.protocol + '//';
	value += this.hostname;
	if (this.port) value += ':' + this.port;
	var remain = this.pathname + this.search + this.hash;
	if (remain !== '/') value += remain;

	return decodeURI(value);
};

Url.prototype.hierarchize = function () {
	var url = this;
	var urls = [];
	if (url.hash) {
		url = Object.create(url);
		url.hash = '';
	}
	if (url.search) {
		url = Object.create(url);
		url.search = '';
		urls.push(url);
	}
	while (url.pathname !== '/') {
		url = Object.create(url);
		url.pathname = url.pathname.replace(/[^\/]*\/?$/, '');;
		urls.push(url);
	}
	while (!this.isSimpleHost() && /(?:[^.]+\.){2}[^.]+\.?$/.test(url.hostname)) {
		url = Object.create(url);
		url.hostname = url.hostname.replace(/^[^.]+\./, '');
		urls.push(url);
	}

	return urls;
};