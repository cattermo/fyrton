const generateThumbnail = require("./utils/image");
const fs = require("fs");
const path = require("path");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
    const isProd = process.env.NODE_ENV === 'production';

    eleventyConfig.addPlugin(sitemap, {
        lastModifiedProperty: "modified",
        sitemap: {
            hostname: "https://fyrton.se",
        },
    });

    eleventyConfig.addFilter("viteAsset", function (originalPath) {
        if (!isProd) {
            return `/${originalPath}`; // e.g. "/src/styles/main.less"
        }
        const manifestPath = path.resolve(__dirname, "dist/.vite/manifest.json");
        if (!fs.existsSync(manifestPath)) return originalPath;
        const manifest = JSON.parse(fs.readFileSync(manifestPath));
        const hashed = manifest[originalPath];
        return hashed ? `/${hashed.file}` : originalPath;
    });

    eleventyConfig.addFilter("keysDesc", function (obj) {
        return Object.keys(obj).sort((a, b) => b - a);
    });

    eleventyConfig.addNunjucksAsyncShortcode("thumbnail", async function (src, alt, className) {
        return await generateThumbnail(src, alt, className);
    });

    // Copy non-bundled assets
    eleventyConfig.addPassthroughCopy({"src/images": "images"});
    eleventyConfig.addPassthroughCopy("src/files");
    eleventyConfig.addPassthroughCopy({"dist/assets": "assets"});
    eleventyConfig.addPassthroughCopy({"src/robots.txt": "/robots.txt"});

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
