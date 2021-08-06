const app = require('./src/index.js')

const {PORT} = require('./src/config.json') 

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})