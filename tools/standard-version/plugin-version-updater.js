module.exports.readVersion = function () {
  return false;
};

module.exports.writeVersion = function (contents, version) {
  let result = contents.replace(/\* Version: .*/gm, `* Version: ${version}`);

  result = result.replace(
    /const PLUGIN_VERSION = .*;/gm,
    `const PLUGIN_VERSION = '${version}';`
  );

  return result;
};
