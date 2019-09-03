module.exports = function(cfg) {
    cfg.addPassthroughCopy("admin");
    cfg.addPassthroughCopy("assets/styles/*.css");
}