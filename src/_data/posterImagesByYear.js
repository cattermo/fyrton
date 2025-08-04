const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "../images/affischer");

module.exports = () => {
  const years = fs.readdirSync(BASE)
    .filter(f => fs.statSync(path.join(BASE, f)).isDirectory());

  const result = {};

  years.forEach(year => {
    const dir = path.join(BASE, year);
    const files = fs.readdirSync(dir).filter(f =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(f).toLowerCase())
    );

    result[year] = files.map(file => ({
      name: path.parse(file).name,
      relativePath: `/images/affischer/${year}/${file}`,
      inputPath: `src/images/affischer/${year}/${file}`
    }));
  });

  return result;
};
