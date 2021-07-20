const router = require('express').Router();
const models = require('../db/models/');

router.get('/', async(req, res)=>{
  try{

    records = await models.Company.findAll();

    res.status(200).send(records)

  }catch(e){
    console.log(e)
    res.status(400).send(e)

  }
})

router.get('/:id', async (req, res)=>{
  try{

    
    record = await models.Company.findByPk(req.params.id);
    console.log('record', record)

    if(record){
      res.status( 200 ).send( record.toJSON() );
    }else{
      res.status(404).send('Not Found')
    }

  }catch(e){
    console.log(e)
    res.status(400).send(e);
  }
})

module.exports = router;