import { Request, Response } from 'express'
const login = (_req: Request, res: Response) => {
  return res.send('login route ok')
}
export default login
