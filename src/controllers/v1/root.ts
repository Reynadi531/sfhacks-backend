import { Request, Response } from 'express'

const root = (_req: Request, res: Response) => {
  res.send('ok')
}

export default root
