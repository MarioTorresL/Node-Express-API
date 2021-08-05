const router = require('express').Router();
const models = require('../db/models/');

router.get('/', async(req, res)=>{
  try{

    const companies = await models.Companies.findAll();

    res.status(200).send(companies)

  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/:id', async (req, res)=>{
  try{

    const company = await models.Companies.findByPk(req.params.id);

    if(company){
      res.status( 200 ).send( company.toJSON() );
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

    const oldCompany = await models.Companies.findOne({name});

    if(oldCompany){
      return res.status(409).send('Company already exist')
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

router.delete('/:id', async (req, res)=>{

  try{

    const company = await models.Companies.findByPk(req.params.id)

    if(!company){
      return res.status(404).send('Not Found')
    }

    await company.destroy();

    return res.status(204).json()

  }
  catch(e){
    res.status(400).send(e)
  }
})

module.exports = router;