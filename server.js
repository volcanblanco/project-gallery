const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const app = express();
dotenv.config();
const port = process.env.PORT;
const staticFileServerPath = process.env.STATICFILESERVERPATH;

app.use(express.static("static"));

const parseContent = (dirPath) => {
  const items = fs.readdirSync(dirPath, {
    withFileTypes: true,
    recursive: true,
  });

  return items.map((item) => {
    if (item.isDirectory()) {
      let childPath = path.join(dirPath, item.name);
      childPath = childPath.split(path.sep).join("/");
      let projectPrefix = item.name.split(" ").join("");
      let fileContents;
      let content;

      const dirFiles = fs.readdirSync(childPath, { withFileTypes: true });
      let images = [];

      dirFiles.forEach((file) => {
        if (
          path.extname(file.name) === ".jpg" ||
          path.extname(file.name) === ".png"
        ) {
          return images.push(childPath + `/${file.name}`);
        }
      });

      if (path.extname(projectPrefix) !== ".jpg") {
        fileContents = fs.readFileSync(
          `${childPath}` + "/" + projectPrefix + ".md"
        );
        content = matter(fileContents).content;
      }

      return {
        projectName: item.name,
        url: projectPrefix,
        images,
        content,
      };
    }
  });
};

let parsedProjects = parseContent(staticFileServerPath)
let items = {
  assets: parsedProjects.filter((item) => item !== undefined),
}

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.json(items);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
