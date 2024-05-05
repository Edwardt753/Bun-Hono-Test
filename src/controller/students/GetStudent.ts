import db from "../../models/models01";

const GetStudent = async (c: any) => {
  const result = await db.students.findAll();

  return c.json({
    data: result,
  });
};

export { GetStudent };
