import Hapi from "@hapi/hapi";

const port = Number(process.env.PORT) || 3000;

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
      return `Pong ${counter++}`;
    },
  },
]);

await server.start();
console.log(`Server running on port ${server.info.port}`);
