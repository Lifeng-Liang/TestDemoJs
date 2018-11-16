function convert(url) {
	return null;
}

var args = process.argv.splice(2);
if (args.length == 1) {
	console.log(convert(args[0]));
} else {
	console.log("Usage : node main.js http://www.baidu.com/news/1/2/3");
}

module.exports = convert;