import Hapi from "@hapi/hapi";
import fs from 'fs';
import path from 'path';

const port = Number(process.env.PORT) || 3000;

const dirPath = '/usr/src/app/pings';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}
const pingFilePath = path.join(dirPath, 'ping.txt');

const server = Hapi.server({
  port,
  host: "0.0.0.0",
});

let counter = 0;

server.route([
  {
    method: "GET",
    path: "/pingpong",
    handler: () => {
        const current = counter++;
        fs.writeFileSync(pingFilePath, `${current}`);
      return `Pong ${current}`;
    },
  },
]);

await server.start();
console.log(`Server running on port ${server.info.port}`);
