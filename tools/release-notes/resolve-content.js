const fs = require("fs");

const Diff = require("diff");

const original = fs.readFileSync(".github/.release_notes.md", "utf8");
const current = fs.readFileSync("CHANGELOG.md", "utf8");

const diff = Diff.diffLines(original, current);
let newContent = "";

diff.forEach((part) => {
  if (part.added) {
    newContent += part.value;
  }
});

fs.writeFileSync(".github/.release_notes.md", newContent);
