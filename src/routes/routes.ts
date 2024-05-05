import { Hono } from "hono";
import db from "../models/models01";
import { Controller1 } from "../controller/PostUser";
import { GetStudent } from "../controller/students/GetStudent";
import { PostStudent } from "../controller/students/AddStudent";
import { AuthLogin } from "../controller/auth/login";
import { AuthUser } from "../controller/auth/AuthUser";

const router = new Hono();

// GET /book
router.get("/book", (c) => c.text("This is get book"));

// GET /book/:id
router.get("/datas/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const getdata = await db.users.findOne({
      where: {
        id: id,
      },
    });

    return c.json({
      data: getdata,
    });
  } catch (error) {
    return c.json({
      error: error,
    });
  }
});

//opsional parameter
router.get("/animal/:type?", async (c) => {
  return c.text("its animal");
});

//req header
router.get("/headers", async (c) => {
  // const userAgent = c.req.header("accept");
  await c.header("x-message", "This is middleware!");
  return c.json({
    data: true,
  });
});

router.post("/login", async (c) => {
  // await AuthLogin(c);
  // // await AuthUser(c);
  return AuthUser(c);
});

router.post("/dashboard", async (c) => {
  return AuthLogin(c);
});
//req.query
router.get("/search", (c) => {
  const query = c.req.query("q"); //http://localhost:3000/search?q=test
  return c.json({ data: query });
});

router.post("/post", async (c) => await Controller1(c));
router.get("/student", async (c) => await GetStudent(c));
router.post("/student", async (c) => await PostStudent(c));
// router.post("/post", async (c) => {
//   const body = await c.req.parseBody();
//   body["name"];
//   return c.json({ data: body["name"] });
// });

// POST /book
router.post("/datas", async (c) => {
  try {
    const entrydata = await db.users.create({
      name: "bobi",
    });
    return c.json({
      message: true,
      data: "data posted",
    });
  } catch (error) {
    return c.json({
      error: error,
    });
  }
});

export default router;
