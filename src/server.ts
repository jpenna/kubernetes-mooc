import Hapi from "@hapi/hapi";

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

server.route({
  method: "GET",
  path: "/{path*}",
  handler: () => {
    const requestHash = randomHash();
    return `Application ${applicationHash}. Request ${requestHash}`;
  },
});

await server.start();
console.log(`Server running on port ${server.info.port}`);
