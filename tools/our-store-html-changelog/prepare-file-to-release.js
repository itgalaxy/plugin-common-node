const fs = require("fs");
const path = require("path");

const pluginHtmlDescriptionFile = path.normalize(
  `${process.cwd()}/our-store/changelog.html`,
);

if (!fs.existsSync(pluginHtmlDescriptionFile)) {
  console.error("error! plugin changelog file not found.");

  process.exit(1);
}

const data = fs.readFileSync(pluginHtmlDescriptionFile).toString();

fs.writeFileSync(
  pluginHtmlDescriptionFile,
  `<p><strong>v##NEW_VERSION##</strong></p>\n<ul>\n##NEW_VERSION_CONTENT##\n</ul>\n\n${data}`,
);
