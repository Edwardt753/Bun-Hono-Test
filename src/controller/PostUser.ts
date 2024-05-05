// function CreateUser(name: string): string {
//   if (name) {
//   }

//   return name;
// }

// function combineStringAndNumber(str: string, num: number): { concatenated: string; sum: number } {
//     const concatenated = str + num;
//     const sum = str.length + num; // Just an arbitrary operation for demonstration
//     return { concatenated, sum };
// }

const Controller1 = async (c: any) => {
  const body = await c.req.parseBody();
  body["name"];
  return c.json({ data: body["age"] });
};
export { Controller1 };
