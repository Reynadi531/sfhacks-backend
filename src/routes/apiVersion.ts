import express, { Router } from 'express'
import RootController from '../controllers/v1/root'

const v1: Router = express.Router()

v1.get('/', RootController)

export = {
  v1
}
