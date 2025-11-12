const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {
  // Ignore generated HTML files and build artifacts
  eleventyConfig.ignores.add("index.html");
  eleventyConfig.ignores.add("checklist.html");
  eleventyConfig.ignores.add("review.html");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("package*.json");
  eleventyConfig.ignores.add("convert-to-html.js");

  // Configure markdown with Mermaid support
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  // Custom fence renderer for Mermaid
  const defaultFence = md.renderer.rules.fence;
  md.renderer.rules.fence = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    if (token.info === 'mermaid') {
      return `<pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre>`;
    }
    return defaultFence(tokens, idx, options, env, slf);
  };

  eleventyConfig.setLibrary('md', md);

  // Set directories - output to same folder
  return {
    dir: {
      input: ".",
      output: ".",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
