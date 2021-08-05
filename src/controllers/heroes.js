const router = require('express').Router();
const models = require('../db/models');

router.get('/', async(req, res)=>{
  try{

    const heroes = await models.Heroes.findAll();
    res.status(200).send(heroes)

  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/:id', async(req, res)=>{
  try{

    const hero = await models.Heroes.findOne({
      where:{id:req.params.id},
      include:[
        {model:models.Companies}, 
        {model:models.Movies}
      ]
    });

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
    console.log('entraaaaaaaaaa')
    if(Object.entries(req.body).length === 0){
      return res.status(400).send('No data given');
    }

    const {name, CompanyId, MovieId} = req.body;

    const company = await models.Companies.findByPk(CompanyId);
    if(company == null){
      return res.status(400).send('Company Id not found')
    }

    const movie = await models.Movies.findByPk(MovieId);
    if(movie == null){
      return res.status(400).send('Movie Id not found')
    }

    const hero = await models.Heroes.create({
      name: name,
      CompanyId: CompanyId,
      MovieId: MovieId
    });

    res.json(hero.toJSON());

  }catch(e){
    res.status(400).send(e)
  }
})

router.put('/:id', async(req,res)=>{
  try{

    if(Object.entries(req.body).length === 0){
      return res.status(400).send('No data given');
    }

    const {name} = req.body
    if(!name){
      return res.status(400).send('name is required');
    }

    const hero = await models.Heroes.findByPk(req.params.id)
    if(!hero){
      return res.status(404).send('Hero Not Found')
    }

    const updateHero = await hero.update({name:name})

    res.json(updateHero.toJSON());

  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/:id', async(req, res)=>{
  try{
    
    const hero = await models.Heroes.findByPk(req.params.id);

    if(!hero){
      return res.status(404).send('Hero not found');
    }

    await hero.destroy();

    return res.status(204).json()

  }catch(e){
    return res.status(400).send(e)
  }
})
module.exports = router;