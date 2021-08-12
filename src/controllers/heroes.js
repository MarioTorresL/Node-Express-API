const router = require('express').Router();
const models = require('../db/models');

router.get('/', async(req, res)=>{
  try{
    //get all heroes
    const heroes = await models.Heroes.findAll();

    res.status(200).send(heroes)
  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/:id', async(req, res)=>{
  try{
    //get hgero by id, include Companie and Movie models
    const hero = await models.Heroes.findOne({
      where:{id:req.params.id},
      include:[
        {model:models.Companies}, 
        {model:models.Movies}
      ]
    });

    //validate if exist
    if(hero){
      res.status(200).send(hero.toJSON());
    }else{
      res.status(404).send('Not Found')
    }

  }catch(e){
    res.status(400).send(e)
  }
})

router.post('/', async(req, res)=>{
  try{
    //get params
    const {name, CompanyId, MovieId} = req.body;

    //validate params
    if (!(name && CompanyId && MovieId)) {
      res.status(400).send("All input is required");
    }

    const company = await models.Companies.findByPk(CompanyId);
    
    //validate if company exist 
    if(company == null){
      return res.status(400).send('Company Id not found')
    }

    const movie = await models.Movies.findByPk(MovieId);

    //validate if movie exist
    if(movie == null){
      return res.status(400).send('Movie Id not found')
    }

    //create hero
    const hero = await models.Heroes.create({
      name,
      CompanyId,
      MovieId
    });

    res.json(hero.toJSON());

  }catch(e){
    res.status(400).send(e)
  }
})

router.put('/:id', async(req,res)=>{
  try{

    //get params
    const {name} = req.body

    //validate params
    if(!name){
      return res.status(400).send('name is required');
    }

    const hero = await models.Heroes.findByPk(req.params.id)
    
    //validate if hero exist
    if(!hero){
      return res.status(404).send('Hero Not Found')
    }

    //update hero
    const updateHero = await hero.update({name})

    res.json(updateHero.toJSON());

  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/:id', async(req, res)=>{
  try{
    
    const hero = await models.Heroes.findByPk(req.params.id);

    //validate if hero exist
    if(!hero){
      return res.status(404).send('Hero not found');
    }

    //destroy hero
    await hero.destroy();

    return res.status(204).json()

  }catch(e){
    return res.status(400).send(e)
  }
})
module.exports = router;