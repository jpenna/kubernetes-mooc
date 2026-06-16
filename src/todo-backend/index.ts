import Hapi from "@hapi/hapi";
import type { Todo } from "../types";

const port = Number(process.env.PORT) || 3000;

const server = Hapi.server({
  port,
  host: "0.0.0.0",
});

const todos: Todo[] = [];

server.route([
  {
    method: "GET",
    path: "/todos",
    handler: async (_request, h) => {
      return h.response(todos).code(200);
    },
  },
  {
    method: "POST",
    path: "/todos",
    handler: async (request, h) => {
      console.log("POST /todos", request);
      const payload = (await request.payload) as Todo;

      if (payload === undefined) {
        return h.response("Invalid payload").code(400);
      }
      if (payload.text === undefined || payload.text.length === 0) {
        return h.response("Invalid text").code(400);
      }
      if (payload.completed === undefined) {
        payload.completed = false;
      }
      if (payload.completed !== true && payload.completed !== false) {
        return h.response("Invalid completed").code(400);
      }

      const todo: Todo = {
        id: crypto.randomUUID(),
        text: payload.text,
        completed: payload.completed,
      };

      todos.push(todo);
      return h.response(todo).code(201);
    },
  },
]);

await server.start();
console.log(`Server running: http://localhost:${server.info.port}`);
