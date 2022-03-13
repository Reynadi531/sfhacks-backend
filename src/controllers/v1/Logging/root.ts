import express from 'express'
const loggingRouter = express.Router()
import { validateJWT } from '../../../utils/generateJWT'
import userschema from '../../../schemas/userschema'
import savelog from './savelog/log'
import viewlog from './viewlog/viewlog'
loggingRouter.use(async (req, res, next) => {
  const unauthorized = () => {
    return res.status(401).json({
      status: 401,
      message: 'unauthorized',
      data: {}
    })
  }
  const { authorization } = req.headers
  if (!authorization) return unauthorized()
  const payload = await validateJWT(authorization)
  if (!payload || !payload.userid) return unauthorized()
  const nowDate = (new Date().getTime() / 1000) | 0
  if ((payload.exp as number) < nowDate) return unauthorized()
  const user = await userschema.findOne({ userid: payload.userid })
  if (!user) return unauthorized()
  res.locals.userid = payload.userid
  next()
})
loggingRouter.post('/log', savelog)
loggingRouter.get('/log', viewlog)

export default loggingRouter
