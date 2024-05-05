export default (sequelize: any, DataTypes: any) => {
  // Setting a Model Datatables for User Roles
  const SubjectModel = sequelize.define(
    "subjects",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subject_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
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

  return SubjectModel;
};
