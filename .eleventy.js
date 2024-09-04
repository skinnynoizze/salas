module.exports = function(eleventyConfig) {
  // Copy static assets to the output folder
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");

  // Set HTML files to use Nunjucks templating engine
  eleventyConfig.setTemplateFormats(["html", "md", "njk"]);
  eleventyConfig.markdownTemplateEngine = "njk";
  eleventyConfig.htmlTemplateEngine = "njk";

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};