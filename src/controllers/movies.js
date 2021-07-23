const router = require('express').Router();
const bodyParser = require('body-parser');
const models = require('../db/models/');

router.get('/', async (req, res)=>{
  try{

    const movies = await models.Movies.findAll();

    res.status(200).send(movies)

  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/:id', async (req,res)=>{
  try{

    const movie = await models.Movies.findByPk(req.params.id);

    if(movie){
      res.status(200).send(movie.toJSON());
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

    const {actor, name, date} = req.body;

    if(!actor || !name || !date){
      return res.status(400).send('actor, name and date is required');
    }

    const movie = await models.Movies.create({
      actor: actor,
      name: name,
      date: date
    })

    res.json(movie.toJSON())
  }catch(e){
    res.status(400).send(e)
  }
})

router.put('/:id', async(req, res)=>{
  try{

    if(Object.entries(req.body). length === 0){
      return res.status(400).send('No data given')
    }

    const {actor, name, date} = req.body;

    const movie = await models.Movies.findByPk(req.params.id);

    if(!movie){
      return res.status(404).send('Not Found')
    }

    const updateMovie = await movie.update({
      actor: actor,
      name: name,
      date:date
    })

    res.json(updateMovie.toJSON())
  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/:id', async(req, res)=>{
  try{

    const movie = await models.Movies.findByPk(req.params.id);

    if(!movie){
      return res.status(404).send('Not Found');
    }

    await movie.destroy();

    return res.status(204).json()

  }catch(e){
    res.status(404).send(e)
  }
})

module.exports = router;