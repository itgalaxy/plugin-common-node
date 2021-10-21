module.exports.readVersion = function (contents) {
  return false;
};

module.exports.writeVersion = function (contents, version) {
  contents = contents.replace(/\* Version: .*/gm, "* Version: " + version);
  contents = contents.replace(
    /const PLUGIN_VERSION = .*;/gm,
    "const PLUGIN_VERSION = '" + version + "';"
  );

  return contents;
};
