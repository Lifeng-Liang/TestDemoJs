var assert = require('assert');
var convert = require('../main');
var chai = require('chai');

function AssertIs(url, exp, rule) {
    var n = convert(url, rule);
    assert.equal(n, exp);
}

describe('Test', function () {
    it('test null', function () {
        chai.expect(() => convert(null)).to.throw('url can not be null.');
    });

    it('test empty', function () {
        chai.expect(() => convert('')).to.throw('url can not be empty.');
    });

    it('test url', function () {
        AssertIs("http://www.sina.com/test/1/2/3/", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.baidu.com/hello/next/day/hi/", "External/HTTP/www.baidu.com:80/hello/next/");
        AssertIs("http://www.sina.com.cn/", "External/HTTP/www.sina.com.cn:80//");
        AssertIs("http://www.npm.org", "External/HTTP/www.npm.org:80//");
        AssertIs("http://mail.163.com/test/1", "External/HTTP/mail.163.com:80/test/1/");
        AssertIs("http://my.test.net/test/1/", "External/HTTP/my.test.net:80/test/1/");
        AssertIs("http://www.jd.cn/buy", "External/HTTP/www.jd.cn:80/buy/");
        AssertIs("http://www.taobao.com:900/item", "External/HTTP/www.taobao.com:900/item/");
        AssertIs("http://www.tmall.com:832/item/132", "External/HTTP/www.tmall.com:832/item/132/");
    });

    it('test https url', function () {
        AssertIs("https://www.sina.com/test/1/2/3/", "External/HTTPS/www.sina.com:443/test/1/");
        AssertIs("https://www.baidu.com/hello/next/day/hi/", "External/HTTPS/www.baidu.com:443/hello/next/");
        AssertIs("https://www.sina.com.cn/", "External/HTTPS/www.sina.com.cn:443//");
        AssertIs("https://www.npm.org", "External/HTTPS/www.npm.org:443//");
        AssertIs("https://mail.163.com/test/1", "External/HTTPS/mail.163.com:443/test/1/");
        AssertIs("https://my.test.net/test/1/", "External/HTTPS/my.test.net:443/test/1/");
        AssertIs("https://www.jd.cn/buy", "External/HTTPS/www.jd.cn:443/buy/");
        AssertIs("https://www.taobao.com:765/item", "External/HTTPS/www.taobao.com:765/item/");
        AssertIs("https://www.tmall.com:388/item/542", "External/HTTPS/www.tmall.com:388/item/542/");
    });

    it('test Url Upper Case', function () {
        AssertIs("HTTP://www.Taobao.com/test/3/2/1/", "External/HTTP/www.Taobao.com:80/test/3/");
        AssertIs("Http://www.Acer.com/", "External/HTTP/www.Acer.com:80//");
        AssertIs("hTTp://www.MicroSoft.com", "External/HTTP/www.MicroSoft.com:80//");
        AssertIs("httP://www.Tom.com/test/1", "External/HTTP/www.Tom.com:80/test/1/");
        AssertIs("htTp://www.Sina.com/test/1/", "External/HTTP/www.Sina.com:80/test/1/");
        AssertIs("hTtp://www.sina.com/test", "External/HTTP/www.sina.com:80/test/");
        AssertIs("htTp://www.nPlayer.com:900/test", "External/HTTP/www.nPlayer.com:900/test/");
    });

    it('test Url With Query String', function () {
        AssertIs("HTTP://www.sina.com/test/1/2/3/?key=value", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("Http://www.baidu.com/?key=value", "External/HTTP/www.baidu.com:80//");
        AssertIs("hTTp://www.sina.com?key=value", "External/HTTP/www.sina.com:80//");
        AssertIs("httP://www.sina.com/test/1?key=value", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("htTp://www.bing.com/test/1/?key=value", "External/HTTP/www.bing.com:80/test/1/");
        AssertIs("hTtp://www.WhatsApp.com/test?key=value", "External/HTTP/www.WhatsApp.com:80/test/");
        AssertIs("htTp://www.facebook.com:900/test?key=value", "External/HTTP/www.facebook.com:900/test/");
    });

    it('test Unexpected Input', function () {
        AssertIs("www.sina.com/test/1/2/3/", "External/HTTP/Unkown//");
        AssertIs("fde3red", "External/HTTP/Unkown//");
        AssertIs("ftp://www.baidu.com", "External/HTTP/Unkown//");
    });

    it('test Url With Rule First 1', function () {
        var rule = [true, ["segments=1"]];
        AssertIs("https://www.sina.com/test/1/2/3/", "External/HTTPS/www.sina.com:443/test/", rule);
        AssertIs("https://www.sina.com/", "External/HTTPS/www.sina.com:443//", rule);
        AssertIs("https://www.sina.com", "External/HTTPS/www.sina.com:443//", rule);
        AssertIs("https://www.sina.com/test/1", "External/HTTPS/www.sina.com:443/test/", rule);
        AssertIs("https://www.sina.com/test/1/", "External/HTTPS/www.sina.com:443/test/", rule);
        AssertIs("https://www.sina.com/test", "External/HTTPS/www.sina.com:443/test/", rule);
        AssertIs("https://www.sina.com:900/test", "External/HTTPS/www.sina.com:900/test/", rule);
    });

    it('test Url With Rule First 3', function () {
        var rule = [true, ["segments=3"]];
        AssertIs("http://www.sina.com/test/1/2/3/", "External/HTTP/www.sina.com:80/test/1/2/", rule);
        AssertIs("http://www.sina.com/", "External/HTTP/www.sina.com:80//", rule);
        AssertIs("http://www.sina.com", "External/HTTP/www.sina.com:80//", rule);
        AssertIs("http://www.sina.com/test/1?key=value", "External/HTTP/www.sina.com:80/test/1/", rule);
        AssertIs("http://www.sina.com/test/1/", "External/HTTP/www.sina.com:80/test/1/", rule);
        AssertIs("http://www.sina.com/test", "External/HTTP/www.sina.com:80/test/", rule);
        AssertIs("http://www.sina.com:900/test", "External/HTTP/www.sina.com:900/test/", rule);
    });

    it('test Url With Rule First 2 And Parameter', function () {
        var rule = [true, ["segments=2", "parameter=test"]];
        AssertIs("http://www.sina.com/test/1/2/3/", "External/HTTP/www.sina.com:80/test/1/", rule);
        AssertIs("http://www.sina.com/?key=value", "External/HTTP/www.sina.com:80//", rule);
        AssertIs("http://www.sina.com?test=haha", "External/HTTP/www.sina.com:80/haha/", rule);
        AssertIs("http://www.sina.com/test/1?key=value", "External/HTTP/www.sina.com:80/test/1/", rule);
        AssertIs("https://www.sina.com/test/1/?key=value&test=myday", "External/HTTPS/www.sina.com:443/test/1/myday/", rule);
        AssertIs("http://www.sina.com/test?test=ok", "External/HTTP/www.sina.com:80/test/ok/", rule);
    });

    it('test Url With Unexpected Rule', function () {
        var rule = [true, ["segments=2", "host=true"]];
        chai.expect(() => convert("http://www.sina.com/test/1/2/3/", rule)).to.throw('rule [host] not supported.');
    });

    it('test Url Not Match', function () {
        var rule = [false, ["segments=3"]];
        AssertIs("http://www.sina.com/test/1/2/3/", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.sina.com/", "External/HTTP/www.sina.com:80//");
        AssertIs("http://www.sina.com", "External/HTTP/www.sina.com:80//");
        AssertIs("http://www.sina.com/test/1", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.sina.com/test/1/", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.sina.com/test", "External/HTTP/www.sina.com:80/test/");
        AssertIs("http://www.sina.com:900/test", "External/HTTP/www.sina.com:900/test/");
    });
});
