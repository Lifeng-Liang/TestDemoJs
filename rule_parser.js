var UrlProtocol = require('./url_protocol');

function RuleParser(rule) {
    var rules = [];
    rules.push(new ProtocolRule());
    rules.push(new HostportRule());
    //TODO: 完成函数
    rules.push(new DoubleSlashRule());
    return rules;
}

function ProtocolRule() {
    this.Rename = function(url, result) {
        //TODO: 完成函数
    }
}

function HostportRule() {
    this.Rename = function(url, result) {
        //TODO: 完成函数
    }
}

function SegmentRule(count) {
    this.Rename = function(url, result) {
        //TODO: 完成函数
    }
}

function ParameterRule(key) {
    this.Rename = function(url, result) {
        //TODO: 完成函数
    }
}

// 如果只有 host 和 port，则在最后多添加一个 /
function DoubleSlashRule() {
    this.Rename = function(url, result) {
        //TODO: 完成函数
    }
}

module.exports = RuleParser;
