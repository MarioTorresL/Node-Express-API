module.exports = (sequelize, DataTypes) =>{

  const Users = sequelize.define('Users',{
    firstName:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    email:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    password:{
      type: DataTypes.DATE,
      allowNUll: false
    },
    token:{
      type: DataTypes.DATE,
      allowNUll: false
    }
  },{
    paranoid: true,
    timestamps: true,
  })
  return Users;
};