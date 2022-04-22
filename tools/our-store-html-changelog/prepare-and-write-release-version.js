const fs = require("fs");
const path = require("path");

// eslint-disable-next-line import/no-dynamic-require
const { version } = require(path.normalize(`${process.cwd()}/package.json`));

const pluginHtmlDescriptionFile = path.normalize(
  `${process.cwd()}/our-store/changelog.html`
);

if (!fs.existsSync(pluginHtmlDescriptionFile)) {
  console.error("error! plugin changelog file not found.");

  process.exit(1);
}

const data = fs.readFileSync(pluginHtmlDescriptionFile).toString();

fs.writeFileSync(
  pluginHtmlDescriptionFile,
  data.replace("##NEW_VERSION##", version)
);
