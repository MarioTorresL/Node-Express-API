const router = require('express').Router();
const models = require('../db/models/');
const config = require('../config.json')
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

    const oldUser = await models.Users.findOne({
      where:{email}
    });

    if(oldUser){
      return res.status(409).send('User already exist, please login')
    }

    //encript password
    encryptedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await models.Users.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //create token
    const token = jwt.sign(
      {user_id: user.id, email},
      config.TOKEN_KEY,
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

router.post('/login', async(req,res)=>{
  try{
    //input user
    const {email, password} = req.body;

    //validate
    if(!(email && password)){
      res.status(400).send('All input is required')
    }

    //verify if exist
    const user = await models.Users.findOne({
      where:{email}
    })

    if(user && (await bcrypt.compare(password, user.password))){
      //create token
      const token = jwt.sign(
        {user_id:user.id, email},
        config.TOKEN_KEY,
        {
          expiresIn:"2h"
        }
      )

      //save token
      user.token = token;
  
      res.status(200).json(user)
    }
    res.status(400).send('Invalid Credentials')

  }catch(e){
    console.log(e)
  }
})

module.exports = router;