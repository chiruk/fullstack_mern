import express from 'express'
import userCtrl from '../controller/user.controller'
import authCtrl from '../controller/auth.controller'

const router = express.Router()


router.route("/api/users").get(userCtrl.list).post(userCtr.create)
router.route("/api/users/:userId").get(authCtrol.requiresSignin, userCtrl.read).put(authCtrl.requiresSignin, authCtrl.hasAuthorization, 
	 userCtrl.update).delete(authCtrl.requiresSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userById)

export default router;