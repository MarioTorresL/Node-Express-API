const router = require('express').Router();
const models = require('../db/models');

router.get('/', async(req, res)=>{
  try{

    const heroes = await models.Heroes.findAll({
      include:[{model:models.Companies}]
    });
    res.status(200).send(heroes)

  }catch(e){
    res.status(400).send(e)
  }
})

module.exports = router;