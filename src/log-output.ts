import Hapi from "@hapi/hapi";
import fs from 'fs';
import path from 'path';

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
let randomString = '';
for (let i = 0; i < 10; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
}

const isApi = process.env.IS_API === 'true';

const logFilePath = '/usr/src/app/logs/log.txt';

const dirPath = path.dirname(logFilePath);
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '');
}

export function print() {
    const now = new Date();
    const str = `${now.toISOString()}: ${randomString}`;
    console.log(str);
    fs.appendFileSync(logFilePath, str + '\n');
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
        path: "/logs",
        handler: () => {
          const logs = fs.readFileSync(logFilePath, 'utf8');
          return logs;
        },
      },
    ]);

    await server.start();
    console.log(`Server running on port ${server.info.port}`);
} else {
    print();
    setInterval(print, 5000);

}
