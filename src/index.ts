import { Hono } from "hono";
import router from "./routes/routes";
import { logger } from "hono/logger";

const app = new Hono();

//logger
app.use("*", logger());

app.get("/hello", (c) => {
  return c.json({ hello: "world" });
});

app.route("/", router);

//for Not found endpoint url
app.notFound((c) => {
  return c.text("Custom 404 Message", 404);
});

// Error Handling - 500 Internal Error
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json(
    { message: "Oh no, there is an error occured on the server" },
    500
  );
});

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log(`Listening on http://localhost:${server.port} ...`);
