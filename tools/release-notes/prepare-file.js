const fs = require("fs");

const currentChangeLog = fs.readFileSync("CHANGELOG.md", "utf8");

fs.writeFileSync(".github/.release_notes.md", currentChangeLog);
