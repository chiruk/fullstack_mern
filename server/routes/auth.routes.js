import express from 'express'
import authCtrl from "../controller/auth.contoller.js"

const router = express.Router()

router.route("/auth/signin").post(authCtrl.signin)
router.route("/auth/singout").post(authCtrl.signout)

export default router 