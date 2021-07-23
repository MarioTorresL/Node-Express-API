const router = require('express').Router();
const bodyParser = require('body-parser');
const models = require('../db/models/');

router.get('/', async(req, res)=>{
  try{

    const records = await models.Companies.findAll();

    res.status(200).send(records)

  }catch(e){
    console.log(e)
    res.status(400).send(e)
  }
})

router.get('/:id', async (req, res)=>{
  try{

    const record = await models.Companies.findByPk(req.params.id);

    if(record){
      res.status( 200 ).send( record.toJSON() );
    }else{
      res.status(404).send('Not Found')
    }

  }catch(e){
    res.status(400).send(e);
  }
})

router.post('/', async(req, res)=>{
  try{
    
    if( Object.entries(req.body).length === 0 ){
      return res.status(400).send('No data given')
    }
    
    const {name} = req.body

    if(!name){
      return res.status(400).send('name is required')
    }

    const company = await models.Companies.create({name:name});

    res.json(company.toJSON())
    
  }catch(e){
    res.status(400).send(e)
  }
})

router.put ('/:id', async (req, res) =>{
  try{

    if( Object.entries(req.body).length === 0 ){
      return res.status(400).send('No data given')
    }

    const {name} = req.body

    if(!name){
      return res.status(400).send('name is required')
    }

    const company = await models.Companies.findByPk(req.params.id);

    if(!company){
      return res.status(404).send('Not Found')
    }

    const updateCompany = await company.update({name:name});

    res.json(updateCompany.toJSON())
  }catch(e){
    res.status(400).send(e)
  }
})




module.exports = router;