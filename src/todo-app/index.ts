import Hapi from "@hapi/hapi";
import axios from "axios";
import fs from "fs";
import path from "path";
import { buildPage } from "./page";

const imageUrl = process.env.IMAGE_URL;
if (!imageUrl) {
  throw new Error("IMAGE_URL is not set");
}

const isKubernetes = Boolean(process.env.KUBERNETES_SERVICE_HOST);
const appDir = isKubernetes ? "/usr/src/app/files" : "./vols";
const imageFilePath = path.join(appDir, "img.jpg");

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

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
    path: "/",
    handler: async (_request, h) => {
      const now = Date.now();

      if (now - lastImgFetch < cacheFor) {
        console.log("Cache hit");
        return buildPage("/img.jpg");
      }

      console.log("Cache miss");

      lastImgFetch = now;

      await axios.get(imageUrl, { responseType: "stream" }).then((response) => {
        response.data.pipe(fs.createWriteStream(imageFilePath));
      });

      return h.response(buildPage("/img.jpg")).type("text/html");
    },
  },
  {
    method: "GET",
    path: "/img.jpg",
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
