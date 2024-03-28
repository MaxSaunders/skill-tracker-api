import { Request, Response } from "express"

const express = require("express")
const router = express.Router()

const getStatus = (req: Request, res: Response) => {
    res.send("SkillTracker v1 - Online")
}

router.get("/", getStatus)

module.exports = router
