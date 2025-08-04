const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "../images/press");
  const exts = [".jpg", ".jpeg", ".png", ".webp"];

  // Read image files
  const files = fs.readdirSync(dir)
    .filter(file => exts.includes(path.extname(file).toLowerCase()))
    .map(file => {
      return {
        name: path.parse(file).name,
        relativePath: `/images/press/${file}`,
        inputPath: `src/images/press/${file}` // needed for eleventy-img
      };
    });

  return files;
};
