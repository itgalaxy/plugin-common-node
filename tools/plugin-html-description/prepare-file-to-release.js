const fs = require("fs");
const path = require("path");
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
  data.replace(
    "CHANGELOG</h2>",
    "CHANGELOG</h2>\n\n<p><strong>v##NEW_VERSION##</strong></p>\n<pre>\n##NEW_VERSION_CONTENT##\n</pre>"
  )
);
