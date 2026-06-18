import Hapi from "@hapi/hapi";

// const client = await new Client({
//   user: "postgres",
//   host: "postgres-svc.exercises.svc.cluster.local",
//   database: "postgres",
//   password: process.env.POSTGRES_PASSWORD,
//   port: 5432,
// }).connect();

const port = Number(process.env.PORT) || 3000;

let counter = 0;

const server = Hapi.server({
  port,
  host: "0.0.0.0",
});

server.route([
  {
    method: "GET",
    path: "/",
    handler: async () => {
      console.log("Pingpong request received");
      try {
        // const inserted = await client.query(
        //   "INSERT INTO pings DEFAULT VALUES RETURNING id;",
        // );
        // const counter = inserted.rows[0].id - 1;
        return counter++;
      } catch (error) {
        console.error("Error inserting into database", error);
        throw error;
      }
    },
  },
]);

await server.start();
console.log(`Server running on port ${server.info.port}`);
