import Router from "express"

import { conversar } from "../controllers/ia.controller.js"

const router = Router();

router.post('/ia', conversar)

export default router