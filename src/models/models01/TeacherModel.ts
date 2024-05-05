export default (sequelize: any, DataTypes: any) => {
  // Setting a Model Datatables for User Roles
  const TeacherModel = sequelize.define(
    "teachers",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  return TeacherModel;
};
