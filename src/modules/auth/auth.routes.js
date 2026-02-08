import { Router } from "express"
import { getCurrentUserController, loginUserController, logoutUserController, registerUserController } from "./auth.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = Router()

// routes
router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.post('/logout', logoutUserController)
router.get('/current-user', authMiddleware, getCurrentUserController)

export default router
