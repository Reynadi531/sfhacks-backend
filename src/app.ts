import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import { config } from 'dotenv'

const app: Application = express()
config()

app.use(helmet())
app.use(cors())
app.use(compression())
if (process.env['NODE_ENV'] !== 'production') {
  app.use(morgan('dev'))
}

import apiVersion from './routes/apiVersion'
app.use('/api/v1', apiVersion.v1)

const PORT: number = Number(process.env['PORT']) || 3000

app.get('/', (_req: Request, res: Response) => {
  return res.send('ok')
})

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`)
})
