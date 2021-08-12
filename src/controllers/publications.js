const router = require('express').Router();
const models = require('../db/models');

router.get('/', async (req, res) =>{
  try{
    //get all publications
    const publications = await models.Publications.findAll();

    res.status(200).send(publications);
  }catch(e){
    res.status(400).send(e)
  }
});

router.get('/:id', async(req, res)=>{
  try{
    //get publication by id include user and hero
    const publication = await models.Publications.findOne({
      where:{id:req.params.id},
      include:[
        {model: models.Users},
        {model: models.Heroes}
      ]
    });

    //validate if exist
    if(publication){
      res.status(200).send(publication.toJSON());
    }else{
      res.status(404).send('Not found')
    }
  }catch(e){
    res.status(400).send(e)
  }
});

router.post('/', async(req,res) =>{
  try{
    //get params
    const {title, UserId, HeroId} = req.body;

    //valdiate params

    if(!(title && UserId && HeroId)){
      return res.status(400).send("All input is required")
    }

    //validate if hero exist
    const hero = await models.Heroes.findByPk(HeroId);
    if(!hero){
      return res.status(400).send('Hero no exist')
    }

    //validate user
    const user = await models.Users.findByPk(UserId);
    if(!user){
      return res.status(400).send('User no exist')
    }

    //create publication
    const publication = await models.Publications.create({
      title,
      UserId,
      HeroId
    })

    res.json(publication.toJSON());
  }catch(e){
    console.log(e)
    res.status(400).send(e)
  }
});

router.put('/:id', async(req, res)=>{
  try{

    const {title} =req.body;

    //validate params
    if(!title){
      return res.status(400).send('title is required')
    }

    const publication = await models.Publications.findByPk(req.params.id);

    //validate if publication exist
    if(!publication){
      return res.status(404).send('Publication not found')
    }

    //update publication
    const updatePublication = await publication.update({title});

    res.json(updatePublication.toJSON());
  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/:id', async(req,res)=>{
  try{

    const publication = await models.Publications.findByPk(req.params.id);

    //vcalidate if publication exist
    if(!publication){
      return res.status(404).send('publication not found');
    }

    //delete publication
    await publication.destroy();

    return res.status(204).json()
  }catch(e){
    return res.status(400).send(e)
  }
})
module.exports = router;