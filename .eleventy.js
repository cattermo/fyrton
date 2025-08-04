const generateThumbnail = require("./utils/image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("keysDesc", function (obj) {
    return Object.keys(obj).sort((a, b) => b - a);
  });

  // ✅ Add Nunjucks async shortcode for thumbnails
  eleventyConfig.addNunjucksAsyncShortcode("thumbnail", async function (src, alt, className) {
    return await generateThumbnail(src, alt, className);
  });

  // ✅ Passthrough copy the original images
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  eleventyConfig.addPassthroughCopy("src/files");

  eleventyConfig.addPassthroughCopy("src/scripts");

  eleventyConfig.addPassthroughCopy("assets");


  // Base config
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
