import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
const app: Application = express()
config()

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(bodyParser.json())

if (process.env['NODE_ENV'] !== 'production') {
  app.use(morgan('dev'))
}

import apiVersion from './routes/apiVersion'
app.use('/api/v1', apiVersion.v1)

const PORT: number = Number(process.env['PORT']) || 3000

app.get('/', (_req: Request, res: Response) => {
  return res.send('ok')
})

app.listen(PORT, async () => {
  console.log(`Listening at PORT ${PORT}`)
  const mongouri = process.env['MONGODB_URI']
  if (!mongouri) throw new Error("Can't find MONGODB_URI in .env")
  await mongoose.connect(mongouri)
  console.log('Connected to MongoDB')
})
