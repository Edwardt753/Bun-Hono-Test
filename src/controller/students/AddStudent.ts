import db from "../../models/models01";

const PostStudent = async (c: any) => {
  try {
    const body = await c.req.parseBody();
    console.log(body);
    const result = await db.students.create({
      fullname: body["fullname"],
      email: body["email"],
      gender: body["gender"],
      grade: body["grade"],
    });

    return c.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export { PostStudent };
