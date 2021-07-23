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
    const {name} = req.body

    if( Object.entries(req.body).length === 0 ){
      return res.status(400).send('No data given')
    }

    if(!name){
      return res.status(400).send('name is required')
    }

    const company = await models.Companies.create({name:name});

    res.json(company.toJSON())
    
  }catch(e){
    res.send(e)
  }
})

// router.post('/', async(req, res) =>{
//   try{
//       const data = _.pick(req.body, ['name']);

//       if(_.isEmpty(data)){
//           return res.error(new RisksCreateError('No data given'))
//       }

//       if(!data.name){
//           return res.error(new RisksCreateError('Nombre es requerido'))
//       }

//       const risk = await Risks.create(data);

//       const getRisk = await Risks.findOne({
//           where: {id: risk.id}
//       })
//       res.json(getRisk.toJSON());
//   }catch(e){
//       if (e.name === 'SequelizeUniqueConstraintError') {
//           res.error(new RisksCreateError(e.message))
//       } else {
//           res.error(e);
//       } 
//   }
// })

// router.put('/:id', async (req, res) =>{
//   try{
//       const data = _.pick(req.body, ['name']);

//       const risk = await Risks.findByPk(req.params.id);

//       const updaterisk = await risk.update({
//           name: data.name
//       })
//       res.json(updaterisk)
//   }catch(e){
//       res.status(400).json({
//           error:{
//               type: 'Bad Request',
//               message: 'Error'
//           }
//       }) 
//   }
// })

// router.delete('/:id', async (req, res) =>{
//   try{
//       const risk = await Risks.findByPk(req.params.id)

//       if(risk){
//           await risk.destroy();
//           return res.status(204).json();
//       } else {
//           return res.status(404).error(new RisksCreateError('Riesgo no encontrado'))
//       }
//   }catch(e){
//       res.status(400).json({
//           error: {
//               type: 'Bad Request',
//               message: 'Error'
//           }
//       })
//   }
// })

module.exports = router;