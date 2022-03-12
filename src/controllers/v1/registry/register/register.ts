import { Request, Response } from 'express'
import { v4 as generate } from 'uuid'
import userschema from '../../../../schemas/userschema'
import bcrypt from 'bcrypt'
const login = async (req: Request, res: Response) => {
  //Validate all data
  const { body } = req
  const { email, password, name, number, age } = body
  const gender: string = body.gender ? body.gender : 'NOT SPECIFIED'
  if (!email || !password || !name || !number || !age)
    return res.status(400).json({
      message: 'bad request',
      status: 400,
      data: {}
    })

  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
  const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  )
  const numberRegex = new RegExp(/^[0-9]+$/)
  const ageRegex = new RegExp(/^[0-9]+$/)
  if (
    !emailRegex.test(email) ||
    !passwordRegex.test(password) ||
    !numberRegex.test(number) ||
    !ageRegex.test(age)
  ) {
    return res.status(400).json({
      message: 'bad request',
      status: 400,
      data: {}
    })
  }

  // Validate if the number and age is an integer
  if (
    !Number.isInteger(Number(parseInt(number))) ||
    !Number.isInteger(Number(parseInt(age)))
  ) {
    return res.status(400).json({
      message: 'bad request',
      status: 400,
      data: {}
    })
  }
  const newUserId: string = generate()
  const passwordHash = await bcrypt.hash(password, 10)
  if (!passwordHash)
    return res.status(500).json({
      message: 'internal server error',
      status: 500,
      data: {}
    })

  const validateEmail = await userschema.find({ email: email }).catch(() => {
    return undefined
  })
  const validatePassword = await userschema
    .find({ password: password })
    .catch(() => {
      return undefined
    })
  if (validateEmail?.length !== 0 || validatePassword?.length !== 0) {
    return res.status(400).json({
      message: 'Email or Phone Number Taken',
      status: 400,
      data: {}
    })
  }
  await userschema
    .findOneAndUpdate(
      {
        email: email
      },
      {
        userid: newUserId,
        name: name,
        email: email,
        password: passwordHash,
        number: number,
        age: age,
        gender: gender
      },
      {
        upsert: true
      }
    )
    .catch(() => {
      return res.status(500).json({
        message: 'internal server error',
        status: 500,
        data: {}
      })
    })

  return res.status(200).json({
    message: 'success',
    status: 200
  })
}
export default login
