import { Router } from 'express'
import * as cookCtrl from '../controllers/cooks.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()


// GET /cooks
router.get('/', isLoggedIn, cookCtrl.index)

// GET /cooks/:id
router.get('/:id', isLoggedIn, cookCtrl.show)


export {
  router
}
