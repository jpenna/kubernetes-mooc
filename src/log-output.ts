import Hapi from "@hapi/hapi";
import axios from "axios";
import fs from "fs";
import path from "path";

const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
let randomString = "";
for (let i = 0; i < 10; i++) {
  randomString += characters.charAt(
    Math.floor(Math.random() * characters.length),
  );
}

// const envFile = fs.readFileSync(
//   path.join("/etc/config", "information.txt"),
//   "utf8",
// );

function createFile(filePath: string) {
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
}

const isApi = process.env.IS_API === "true";
const isKubernetes = Boolean(process.env.KUBERNETES_SERVICE_HOST);
const appDir = isKubernetes ? "/usr/src/app" : "./vols";

const logFilePath = path.join(appDir, "logs", "log.txt");
// const pingFilePath = path.join(appDir, "pings", "ping.txt");

createFile(logFilePath);
// createFile(pingFilePath);

export function print() {
  const now = new Date();
  const str = `${now.toISOString()}: ${randomString}`;
  // console.log(`env file: ${envFile} ${str}`);
  fs.appendFileSync(logFilePath, str + "\n");
  return str;
}

if (isApi) {
  const port = Number(process.env.PORT) || 3000;

  const server = Hapi.server({
    port,
    host: "0.0.0.0",
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: async () => {
        console.log("Logs request received");
        const logs = fs.readFileSync(logFilePath, "utf8");

        console.log("Requesting ping");
        const ping = await axios
          .get("http://ping-svc:2400/")
          // .get("http://ping-svc:2355/pingpong")
          .then((response) => response.data);

        console.log("Ping response received", ping);

        // const ping = fs.readFileSync(pingFilePath, "utf8");
        return `${logs}<br/>Ping / Pong: ${ping ?? "0"}`;
      },
    },
  ]);

  await server.start();
  console.log(`Server running: http://localhost:${server.info.port}`);
} else {
  print();
  setInterval(print, 5000);
}
