import { Router } from 'express'
import * as restCtrl from '../controllers/restaurants.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()

// GET /restaurants
router.get('/', isLoggedIn ,restCtrl.index)

// GET /restaurants/new
router.get('/new', isLoggedIn, restCtrl.new)

// GET /restaurants/:id
router.get('/:id', isLoggedIn, restCtrl.show)

// GET /restaurants/:id/edit
router.get('/:id/edit', isLoggedIn, restCtrl.edit)

// POST /restaurants
router.post('/', isLoggedIn, restCtrl.create)

// PUT /restaurants/:id
router.put('/:id', isLoggedIn, restCtrl.update)

// DELETE /restaurants/:id
router.delete('/:id', isLoggedIn, restCtrl.delete)

export {
  router
}
