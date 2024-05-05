import dbConfig from "./dbConfig";
import { Sequelize, DataTypes } from "sequelize";
import { ListStudents, ListTeacher, SubjectList } from "./seeder";
import Student_Model from "./StudentModel";
import TeacherModel from "./TeacherModel";
import SubjectModel from "./SubjectModel";

// Create Connection Between Sequelize and Database (--> MySQL)
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

// //Test Connection
// try {
//   sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.students = Student_Model(sequelize, DataTypes);
db.teachers = TeacherModel(sequelize, DataTypes);
db.subject = SubjectModel(sequelize, DataTypes);

//Sync DB
db.sequelize
  .sync({ force: false }) //not updating
  // .sync({ force: true }) // force sync --> remove old and create new
  // .sync({ alter: true }) // sync update --> update existing table only

  // Call seeder file to seed the database based on .env conditional
  .then(async () => {
    console.log("Synchronization completed.");
    if (Bun.env.SEED_DB === "false") {
      //insert data seeder
      try {
        await db.students.bulkCreate(ListStudents);
        await db.teachers.bulkCreate(ListTeacher);
        await db.subject.bulkCreate(SubjectList);
        console.log("Seeder completed.");
      } catch (error) {
        console.log(error);
      }
    }
  });

export default db;
