import { Request, Response } from 'express'
import Joi, { Schema, ValidationResult } from 'joi'
import userModel, { userSchemaInterface } from '../../../../schemas/userschema'
import bcrypt from 'bcrypt'
import { generateJWT } from '../../../../utils/generateJWT'

interface ILogin {
  email: string
  password: string
}

const LoginScheme: Schema<ILogin> = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(
    new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  )
})

const login = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: 400,
      message: 'body not found',
      data: {}
    })
  }

  const validation: ValidationResult = LoginScheme.validate(req.body)
  if (validation['error']) {
    return res.status(400).json({
      status: 400,
      message: validation['error'].details,
      data: {}
    })
  }

  userModel.findOne(
    { email: req.body['email'] } as userSchemaInterface,
    (err: any, doc: userSchemaInterface) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: 'error when finding user',
          data: {}
        })
      }

      if (!doc) {
        return res.status(400).json({
          status: 400,
          message: 'Wrong credentials',
          data: {}
        })
      }

      bcrypt.compare(
        req.body['password'],
        doc['password'],
        async (err, result) => {
          if (err) {
            return res.json({
              status: 500,
              message: 'Error when processing password',
              data: {}
            })
          }

          if (!result) {
            return res.json({
              status: 400,
              message: 'Wrong password',
              data: {}
            })
          }

          const jwt = await generateJWT(doc['userid'])
          return res.status(200).json({
            status: 200,
            message: 'Logged in',
            data: {
              token: jwt
            }
          })
        }
      )
    }
  )
}
export default login
