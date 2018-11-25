var Url = require('./url');
var Result = require('./result');
var RuleParser = require('./rule_parser');

function convert(url, rule) {
	var u = new Url(url);
	var result = new Result("External/");
	var rules = RuleParser(rule);
	rules.forEach(r => r.Rename(u, result));
	return result.Text;
}

var args = process.argv.splice(2);
if (args.length == 1) {
	console.log(convert(args[0]));
} else {
	console.log("Usage : node main.js http://www.baidu.com/news/1/2/3");
}

module.exports = convert;