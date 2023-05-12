import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import expressLayouts from 'express-ejs-layouts'
import 'dotenv/config'
const app = express()
const port = process.env.PORT
import databaseConnexion from './tools/databaseConnexion'
import users from './routes/users'



//connect to mongodb database
databaseConnexion()

//enable ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))


//enable middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
//app.use(expressLayouts)

//Bdd
app.use('/', users)




//enable routes

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
