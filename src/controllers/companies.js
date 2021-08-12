const router = require('express').Router();
const models = require('../db/models/');

router.get('/', async(req, res)=>{
  try{
    // get all companies
    const companies = await models.Companies.findAll();

    res.status(200).send(companies)
  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/:id', async (req, res)=>{
  try{
    // get company by id
    const company = await models.Companies.findByPk(req.params.id);

    //validate if company exist
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
    //get params  
    const {name} = req.body

    //validate params
    if(!name){
      return res.status(400).send('name is required')
    }

    const oldCompany = await models.Companies.findOne({name});
    
    //validate if company exist
    if(oldCompany){
      return res.status(409).send('Company already exist')
    }
    
    //create company
    const company = await models.Companies.create({name});

    res.json(company.toJSON())
    
  }catch(e){
    res.status(400).send(e)
  }
})

router.put ('/:id', async (req, res) =>{
  try{
    //get params
    const {name} = req.body

    //validate params
    if(!name){
      return res.status(400).send('name is required')
    }

    const company = await models.Companies.findByPk(req.params.id);

    //validate if company exist
    if(!company){
      return res.status(404).send('Not Found')
    }

    //update company
    const updateCompany = await company.update({name});

    res.json(updateCompany.toJSON())
  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/:id', async (req, res)=>{

  try{

    const company = await models.Companies.findByPk(req.params.id)
    
    //validate if copmpany exist
    if(!company){
      return res.status(404).send('Not Found')
    }
    //delete company
    await company.destroy();

    return res.status(204).json()
  }
  catch(e){
    res.status(400).send(e)
  }
})

module.exports = router;