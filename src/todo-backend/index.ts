import Hapi from "@hapi/hapi";
import pg from "pg";
import type { Todo } from "../types";

const port = Number(process.env.PORT) || 3000;

const client = new pg.Client({
  user: "postgres",
  host: "postgres-svc",
  database: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
await client.connect();

const server = Hapi.server({
  port,
  host: "0.0.0.0",
});

function createTodo(text: string, completed = false) {
  return client.query(
    "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *",
    [text, false],
  );
}

server.route([
  {
    method: "GET",
    path: "/todos",
    handler: async (_request, h) => {
      const todos = await client.query<Todo>("SELECT * FROM todos");
      return h.response(todos.rows).code(200);
    },
  },
  {
    method: "POST",
    path: "/todos",
    handler: async (request, h) => {
      const payload = (await request.payload) as Todo;

      if (payload === undefined) {
        console.error({ error: "Invalid payload" });
        return h.response("Invalid payload").code(400);
      }
      if (payload.text === undefined || payload.text.length === 0) {
        console.error({ error: "Invalid text" });
        return h.response("Invalid text").code(400);
      }
      if (payload.completed === undefined) {
        payload.completed = false;
      }
      if (payload.completed !== true && payload.completed !== false) {
        console.error({ error: "Invalid completed" });
        return h.response("Invalid completed").code(400);
      }

      const result = await createTodo(payload.text, payload.completed);

      return h.response(result.rows[0]).code(201);
    },
  },
  {
    method: "POST",
    path: "/todos/wiki",
    handler: async (request, h) => {
      const payload = (await request.payload) as { url?: string };

      if (payload?.url === undefined || payload.url.length === 0) {
        return h.response("Invalid url").code(400);
      }

      const wikiUrl = payload.url.startsWith("//")
        ? `https:${payload.url}`
        : payload.url;
      const text = `Wiki: ${wikiUrl}`;

      const result = await createTodo(text, false);

      return h.response(result.rows[0]).code(201);
    },
  },
]);

await server.start();
console.log(`Server running: http://localhost:${server.info.port}`);
