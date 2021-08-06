module.exports = (sequelize, DataTypes) =>{

  const Users = sequelize.define('Users',{
    first_name:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    last_name:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    email:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    password:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    token:{
      type: DataTypes.STRING,
      allowNUll: false
    }
  },{
    paranoid: true,
    timestamps: true,
  })
  return Users;
};