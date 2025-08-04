const Image = require("@11ty/eleventy-img");

async function generateThumbnail(src, alt = "", className = "") {
  console.log("Generating Thumbnail", src);
  let metadata = await Image(src, {
    widths: [300],
    formats: ["jpeg"],
    outputDir: "./_site/images/generated",
    urlPath: "/images/generated/",
    sharpOptions: {
      animated: false
    },
    sharpJpegOptions: {
      quality: 90
    },
    useImageMagick: true // matches your old config
  });

  let imageAttributes = {
    alt,
    className,
    loading: "lazy",
    decoding: "async"
  };

  // Return just the <img> HTML element
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = generateThumbnail;
