import express from 'express'
const versionRoute = express.Router()

import registryRouter from './registry/root'

versionRoute.get('/', (_req, res) => {
  return res.send('v1')
})
versionRoute.get('/registry', (_req, res) => {
  return res.send('registry')
})
versionRoute.use('/registry', registryRouter)

export default versionRoute
