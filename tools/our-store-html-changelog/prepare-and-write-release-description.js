const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const version = require(path.normalize(
  process.cwd() + "/package.json"
)).version;
const pluginHtmlDescriptionFile = path.normalize(
  process.cwd() + "/our-store/changelog.html"
);

if (!fs.existsSync(pluginHtmlDescriptionFile)) {
  console.error("error! plugin changelog file not found.");

  return;
}

const gitLastCommits = exec("git log v" + version + '..HEAD --format="%s"');
const commits = [];

gitLastCommits.stdout.on("data", (data) => {
  data = data.split("\n");

  data.forEach((commitMessage) => {
    if (commitMessage.length <= 0) {
      return;
    }

    if (
      !commitMessage.startsWith("feat:") &&
      !commitMessage.startsWith("feat(") &&
      !commitMessage.startsWith("fix:") &&
      !commitMessage.startsWith("fix(")
    ) {
      return;
    }

    commits.push(commitMessage);
  });
});

gitLastCommits.stdout.on("end", () => {
  resolveAndWriteNewVersionContent(prepareCommitByType());
});

function prepareCommitByType() {
  const preparedCommits = {
    feat: [],
    fix: [],
  };

  commits.forEach((commitMessage) => {
    if (commitMessage.startsWith("feat:")) {
      preparedCommits.feat.push(commitMessage.split("feat: ")[1]);
    }

    if (commitMessage.startsWith("feat(")) {
      preparedCommits.feat.push(commitMessage.split("): ")[1]);
    }

    if (commitMessage.startsWith("fix:")) {
      preparedCommits.fix.push(commitMessage.split("fix: ")[1]);
    }

    if (commitMessage.startsWith("fix(")) {
      preparedCommits.fix.push(commitMessage.split("): ")[1]);
    }
  });

  return preparedCommits;
}

function resolveAndWriteNewVersionContent(preparedCommits) {
  const newVersionContent = [];

  preparedCommits.feat.forEach((commitMessage) => {
    newVersionContent.push("<li>Feature: " + commitMessage + "</li>.");
  });

  preparedCommits.fix.forEach((commitMessage) => {
    newVersionContent.push("<li>Fixed: " + commitMessage + "</li>.");
  });

  const data = fs.readFileSync(pluginHtmlDescriptionFile).toString();

  fs.writeFileSync(
    pluginHtmlDescriptionFile,
    data.replace("##NEW_VERSION_CONTENT##", newVersionContent.join("\n"))
  );
}
