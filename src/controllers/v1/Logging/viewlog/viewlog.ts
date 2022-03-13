import { Request, Response } from 'express'
import userlogging from '../../../../schemas/loggingschema'
const viewlog = async (_req: Request, res: Response) => {
  const { userid } = res.locals
  if (!userid)
    return res.status(400).json({
      status: 400,
      message: 'invalid request',
      data: {}
    })

  const query = await userlogging.findOne({ userid: userid }).catch(() => {
    return undefined
  })
  if (!query) {
    return res.status(404).json({
      status: 404,
      message: 'user log data not found',
      data: {}
    })
  }
  return res.status(200).json({
    status: 200,
    message: 'success',
    data: {
      logs: query.logs ? query.logs : []
    }
  })
}
export default viewlog
