import { jwt } from "hono/jwt";
import { decode, sign, verify } from "hono/jwt";
import db from "../../models/models01";

const AuthUser = async (c: any) => {
  try {
    const token = c.req.token;
    const token2 = await c.req.header("Authorization");
    console.log("token: ", token);

    //split header form token
    const parseToken = token2.split(" ")[1];
    console.log("token2: ", parseToken);

    const payload = await verify(parseToken, "secret");
    console.log(payload);
    // const { header, payload } = decode(token);

    const CheckToken = await db.students.findOne({
      where: {
        email: payload.email,
      },
    });
    console.log("payload : ", payload);

    if (!CheckToken) {
      return c.json({
        data: false,
        message: "no data found",
      });
    }
    // console.log("Decoded Header:", header);
    // console.log("Decoded Payload:", payload);
    // console.log(Date.now());

    return c.json({
      data: token,
      message: "VERIFY AS ADMIN",
    });
  } catch (error) {
    console.log(error);
    return c.json({
      status: 500, // Or appropriate error status code
      message: "Wrong Token", // Or specific error message
    });
  }
};
export { AuthUser };
