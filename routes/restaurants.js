import { Router } from 'express'
import * as restCtrl from '../controllers/restaurants.js'
const router = Router()

// GET /restaurants
router.get('/', restCtrl.index)

export {
  router
}
