import { Router } from 'express'
import * as restCtrl from '../controllers/restaurants.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()

// GET /restaurants
router.get('/', isLoggedIn ,restCtrl.index)

// GET /restaurants/new
router.get('/new', isLoggedIn, restCtrl.new)

// GET /restaurants/:id
router.get('/restaurants/:id', isLoggedIn, restCtrl.show)

// POST /restaurants
router.post('/restaurants', isLoggedIn, restCtrl.create)

export {
  router
}
