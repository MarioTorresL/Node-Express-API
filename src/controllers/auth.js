const router = require('express').Router();
const models = require('../db/models/');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res)=>{
  try{
    //get params
    const { first_name, last_name, email, password } = req.body;

    //validate params
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await models.Users.findOne({email});

    if(oldUser){
      return res.status(409).send('User already exist, please login')
    }

    //encript password
    encryptedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //create token
    const token = jwt.sign(
      {user_id: user.id, email},
      process.env.TOKEN_KEY,
      {
        expiresIn:"2h"
      }
    );

    //save token
    user.token = token;

    //return new user
    res.status(201).json(user);

  }catch(e){
    console.log(e)
    res.status(400).send(e)
  }
});

module.exports = router;