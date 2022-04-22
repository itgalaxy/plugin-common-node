const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// eslint-disable-next-line import/no-dynamic-require
const { version } = require(path.normalize(`${process.cwd()}/package.json`));

const pluginHtmlDescriptionFile = path.normalize(
  `${process.cwd()}/codecanyon/html_description.html`
);

if (!fs.existsSync(pluginHtmlDescriptionFile)) {
  console.error("error! plugin description file not found.");

  process.exit(1);
}

const gitLastCommits = exec(`git log v${version}..HEAD --format="%s"`);
const commits = [];

gitLastCommits.stdout.on("data", (data) => {
  const list = data.split("\n");

  list.forEach((commitMessage) => {
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
    newVersionContent.push(`- Feature: ${commitMessage}.`);
  });

  preparedCommits.fix.forEach((commitMessage) => {
    newVersionContent.push(`- Fixed: ${commitMessage}.`);
  });

  const data = fs.readFileSync(pluginHtmlDescriptionFile).toString();

  fs.writeFileSync(
    pluginHtmlDescriptionFile,
    data.replace("##NEW_VERSION_CONTENT##", newVersionContent.join("\n"))
  );
}
