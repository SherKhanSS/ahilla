const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_CONN

app.use(express.json({ extended: true }))
app.use('/api', (req, res) => {
  res.status(200).json('test')
})
// app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/questions', require('./routes/questions.routes'))

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log('Server Error', e)
    process.exit(1)
  }
}

start()
