import { Router } from 'express';
import { registeruser } from '../controllers/user.controller.js';
import {upload} from '../middleware/multer.middleware.js'


const router  = Router();

router.route("/register").post(
    upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name : "coverImage",
        MaxCount:1
    }
]),
    registeruser)
// router.route("/login").post(login)


export default router;