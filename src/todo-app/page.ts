import fs from "fs";
import path from "path";

const page = fs.readFileSync(
  path.join(path.dirname(__filename), "page.html"),
  "utf8",
);

export function buildPage(imageUrl: string) {
  return page.replace("${imageUrl}", imageUrl);
}
