module.exports = function(cfg) {
    cfg.addPassthroughCopy("admin");
    cfg.addPassthroughCopy("assets/js");
    cfg.addPassthroughCopy("assets/styles/*.css");
    cfg.addPassthroughCopy({"assets/styles/generated/*.css": "assets/styles"});
}