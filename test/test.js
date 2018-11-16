var assert = require('assert');
var convert = require('../main');
var chai = require('chai');

function AssertIs(url, exp) {
	var n = convert(url);
	assert.equal(n, exp);
}

describe('Test', function() {
	it('test null', function() {
		chai.expect(() => convert(null)).to.throw('url can not be null.');
	});

	it('test empty', function() {
		chai.expect(() => convert('')).to.throw('url can not be empty.');
	});

	it('test url', function() {
        AssertIs("http://www.sina.com/test/1/2/3/", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.sina.com/", "External/HTTP/www.sina.com:80//");
        AssertIs("http://www.sina.com", "External/HTTP/www.sina.com:80//");
        AssertIs("http://www.sina.com/test/1", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.sina.com/test/1/", "External/HTTP/www.sina.com:80/test/1/");
        AssertIs("http://www.sina.com/test", "External/HTTP/www.sina.com:80/test/");
        AssertIs("http://www.sina.com:900/test", "External/HTTP/www.sina.com:900/test/");
	});

	it('test https url', function() {
        AssertIs("https://www.sina.com/test/1/2/3/", "External/HTTPS/www.sina.com:443/test/1/");
        AssertIs("https://www.sina.com/", "External/HTTPS/www.sina.com:443//");
        AssertIs("https://www.sina.com", "External/HTTPS/www.sina.com:443//");
        AssertIs("https://www.sina.com/test/1", "External/HTTPS/www.sina.com:443/test/1/");
        AssertIs("https://www.sina.com/test/1/", "External/HTTPS/www.sina.com:443/test/1/");
        AssertIs("https://www.sina.com/test", "External/HTTPS/www.sina.com:443/test/");
        AssertIs("https://www.sina.com:900/test", "External/HTTPS/www.sina.com:900/test/");
	});
});
