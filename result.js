function Result(prefix) {
    this.Text = prefix;
    this.SectionCount = 0;

    this.Append = function(part) {
        this.Text += part + "/";
        this.SectionCount++;
    }
}

module.exports = Result;