import Hapi from "@hapi/hapi";
import axios from "axios";
import fs from "fs";
import path from "path";
import { buildPage } from "./page";

const isKubernetes = Boolean(process.env.KUBERNETES_SERVICE_HOST);
const appDir = isKubernetes ? "/usr/src/app/files" : "./vols";
const imageFilePath = path.join(appDir, "img.jpg");

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

function randomHash(length = 6): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const applicationHash = randomHash();
const port = Number(process.env.PORT) || 3000;

const server = Hapi.server({
  port,
  host: "0.0.0.0",
});

let lastImgFetch = 0;
const cacheFor = 10 * 60 * 1000; // 10 minutes

server.route([
  {
    method: "GET",
    path: "/todo",
    handler: async (_request, h) => {
      const now = Date.now();
      const requestHash = randomHash();

      if (now - lastImgFetch < cacheFor) {
        console.log("Cache hit");
        return buildPage(applicationHash, requestHash, "/todo/img.jpg");
      }

      console.log("Cache miss");

      lastImgFetch = now;
      const imageUrl = `https://picsum.photos/1200?random=${requestHash}`;

      await axios.get(imageUrl, { responseType: "stream" }).then((response) => {
        response.data.pipe(fs.createWriteStream(imageFilePath));
      });

      return h
        .response(buildPage(applicationHash, requestHash, "/todo/img.jpg"))
        .type("text/html");
    },
  },
  {
    method: "GET",
    path: "/todo/img.jpg",
    handler: (_request, h) => {
      try {
        const image = fs.readFileSync(imageFilePath);
        return h.response(image).type("image/jpeg");
      } catch (err) {
        return h.response("Image not found").code(404).type("text/plain");
      }
    },
  },
]);

await server.start();
console.log(`Server running: http://localhost:${server.info.port}`);
