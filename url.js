var UrlProtocol = require('./url_protocol');

function Url(url) {
    this.Protocol = UrlProtocol.OTHER;
    this.Hostport = "";
    this.Segments = [];
    this.QueryString = {};

    if (url == null) {
        throw new Error("url can not be null.");
    }
    if(url == "") {
        throw new Error("url can not be empty.");
    }
    var lurl = url.toLowerCase();
    if (lurl.startsWith("http://")) {
        Init(this, UrlProtocol.HTTP, url.substring(7), "80");
    } else if (lurl.startsWith("https://")) {
        Init(this, UrlProtocol.HTTPS, url.substring(8), "443");
    } else {
        Protocol = UrlProtocol.OTHER;
    }

    function Init(self, protocol, pureUrl, defaultPort) {
        //TODO: 完成解析
    }
}

module.exports = Url;
