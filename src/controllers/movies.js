const router = require('express').Router();
const models = require('../db/models/');

router.get('/', async (req, res)=>{
  try{
    //get all movies
    const movies = await models.Movies.findAll();

    res.status(200).send(movies)

  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/:id', async (req,res)=>{
  try{

    const movie = await models.Movies.findByPk(req.params.id);

    //validate if movie exist
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
    //get params
    const {actor, name, date} = req.body;

    //valdiate params
    if(!(actor && name && date)){
      return res.status(400).send('All input is required');
    }

    const oldMovie = await models.Movies.findOne({name})

    //validate if movie exist
    if(oldMovie){
      return res.status(409).send('Movie already exist')
    }

    //create movie
    const movie = await models.Movies.create({
      actor,
      name,
      date
    })

    res.json(movie.toJSON())
  }catch(e){
    res.status(400).send(e)
  }
})

router.put('/:id', async(req, res)=>{
  try{

    const {actor, name, date} = req.body;

    //valdiate params
    if(!(actor && name && date)){
      return res.status(400).send("All input is required")
    }

    const movie = await models.Movies.findByPk(req.params.id);

    //validate if movie exist
    if(!movie){
      return res.status(404).send('Not Found')
    }

    //update movie
    const updateMovie = await movie.update({
      actor,
      name,
      date
    })

    res.json(updateMovie.toJSON())
  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/:id', async(req, res)=>{
  try{
    
    const movie = await models.Movies.findByPk(req.params.id);

    //validate if movie exist
    if(!movie){
      return res.status(404).send('Not Found');
    }

    //delete movie
    await movie.destroy();

    return res.status(204).json()

  }catch(e){
    res.status(404).send(e)
  }
})

module.exports = router;