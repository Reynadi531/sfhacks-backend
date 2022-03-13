import { Request, Response } from 'express'
import loggingschema from '../../../../schemas/loggingschema'
const savelog = async (req: Request, res: Response) => {
  const invalidRequest = () => {
    return res.status(400).json({
      status: 400,
      message: 'invalid request',
      data: {}
    })
  }
  const intenalservererror = () => {
    return res.status(500).json({
      status: 500,
      message: 'internal server error',
      data: {}
    })
  }
  const { userid } = res.locals
  if (!userid) return invalidRequest()
  const { heartrate, breatherate, emotion, result } = req.body
  if (!heartrate || !breatherate || !emotion || !result) return invalidRequest()
  const numberRegex = new RegExp(/^[0-9]+$/)
  if (!numberRegex.test(heartrate) || !numberRegex.test(breatherate))
    return invalidRequest()
  await loggingschema
    .findOneAndUpdate(
      {
        userid: userid
      },
      {
        userid: userid,
        $push: {
          logs: {
            date: new Date().toTimeString(),
            heartrate: parseInt(heartrate),
            breatherate: parseInt(breatherate),
            emotion: emotion,
            result: result
          }
        }
      },
      {
        upsert: true
      }
    )
    .catch(() => {
      return intenalservererror()
    })
  return res.status(200).json({
    status: 200,
    message: 'success',
    data: {
      date: new Date().toTimeString(),
      heartrate: parseInt(heartrate),
      breatherate: parseInt(breatherate),
      emotion: emotion,
      result: result
    }
  })
}
export default savelog
