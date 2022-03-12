import jwt from 'jsonwebtoken'

function generateJWT(userid: string) {
  const JWTToken = jwt.sign(
    {
      userid: userid
    },
    String(process.env['JWT_SECRET']),
    {
      expiresIn: '36h'
    }
  )

  return JWTToken
}

export { generateJWT }
