import { Router } from 'express'
import * as restCtrl from '../controllers/restaurants.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()

// GET /restaurants
router.get('/', isLoggedIn ,restCtrl.index)

// GET /restaurants/new
rouger.get('/new', isLoggedIn, restCtrl.newRes)

export {
  router
}
