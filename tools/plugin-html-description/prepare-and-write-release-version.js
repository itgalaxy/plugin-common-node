const fs = require("fs");
const path = require("path");
const version = require(path.normalize(
  process.cwd() + "/package.json"
)).version;
const pluginHtmlDescriptionFile = path.normalize(
  process.cwd() + "/codecanyon/html_description.html"
);

if (!fs.existsSync(pluginHtmlDescriptionFile)) {
  console.error("error! plugin description file not found.");

  return;
}

const data = fs.readFileSync(pluginHtmlDescriptionFile).toString();

fs.writeFileSync(
  pluginHtmlDescriptionFile,
  data.replace("##NEW_VERSION##", version)
);
