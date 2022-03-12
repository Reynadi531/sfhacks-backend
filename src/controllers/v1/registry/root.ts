import express from 'express'
import login from './login/login'
import register from './register/register'
const registryRouter = express.Router()

// Change to post in prod
registryRouter.get('/login', login)
registryRouter.post('/register', register)
export default registryRouter
