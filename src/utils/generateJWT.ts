import * as jose from 'jose'
async function generateJWT(userid: string) {
  const jwt = await new jose.SignJWT({
    userid: userid
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('48h')
    .setIssuedAt((new Date().getTime() / 1000) | 0)
    .sign(Buffer.from(String(process.env['JWT_SECRET'])))
  return jwt
}
async function validateJWT(token: string) {
  const data = await jose
    .jwtVerify(token, Buffer.from(String(process.env['JWT_SECRET'])))
    .catch(err => {
      console.log(err)
      return undefined
    })
  return data?.payload ? data?.payload : undefined
}

export { generateJWT, validateJWT }
