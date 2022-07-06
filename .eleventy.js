const now = String(Date.now())
const pluginSEO = require("eleventy-plugin-seo");
const { DateTime } = require("luxon");



module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/js');
  
  eleventyConfig.addPlugin(pluginSEO, {
    title: "title",
    description: "description",
    url: "https://example",
    author: "author",
    twitter: "twitter",
    image: "/img/social.jpg",
    options: {
      titleStyle: "minimalistic",
      titleDivider: "|",
      imageWithBaseUrl: true,
      twitterCardType: "summary_large_image",
      showPageNumbers: false
    }
  });

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
      dir: {
          input: "src",
          output: "docs"
      }
  }
};