import { jwt, sign } from "hono/jwt";
import db from "../../models/models01";

const AuthLogin = async (c: any) => {
  const body = await c.req.json();

  try {
    const CheckEmail = await db.students.findOne({
      where: {
        email: body["email"],
      },
    });

    //check email in db
    if (!CheckEmail) {
      return c.json({
        status: 404,
        message: "email not found",
      });
    }

    const payload = {
      email: CheckEmail.email,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, //7 days expires
    };

    const secret = "secret";

    const token = await sign(payload, secret);

    c.req.token = token;
    return c.json({
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return c.json({
      status: 500, // Or appropriate error status code
      message: "Internal Server Error", // Or specific error message
    });
  }
};

export { AuthLogin };
