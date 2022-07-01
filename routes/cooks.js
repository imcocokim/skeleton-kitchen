import { Router } from 'express'
import * as cookCtrl from '../controllers/cooks.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()


// GET /cooks
router.get('/', isLoggedIn, cookCtrl.index)

// GET /cooks/:id
router.get('/:id', isLoggedIn, cookCtrl.show)

// GET /cooks/:id/edit
router.get('/:id/edit', isLoggedIn, cookCtrl.edit)

// PUT /cooks/:id
router.put('/:id', isLoggedIn, cookCtrl.update)


export {
  router
}
