import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { addSkillDao, getAllSkillsDao, getSkillDao } from "../helpers/skillsDao"
import { Skill } from "../types"

const express = require("express")
const router = express.Router()

const getSkills = async (req: Request, res: Response) => {
    try {
        const skills = await getAllSkillsDao()
        res.send(skills)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to fetch skills -- " + err })
    }
}

const getSkill = async (req: Request, res: Response) => {
    try {
        const { id: skillId } = req.params
        const skill = await getSkillDao(skillId)
        res.send(skill)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to fetch skill -- " + err })
    }
}

const newSkill = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body
        const id = uuid()
        const skill = {
            id,
            name,
            description,
        } as Skill
        await addSkillDao(skill)
        res.status(200).send("Success")
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to create new skill -- " + err })
    }
}

// const deleteSkill = async (req: Request, res: Response) => {
//     try {
//         const {name, description} = req.body
//         const id = uuid()
//         const skill = {
//             id,
//             name,
//             description
//         } as Skill
//         await addSkill(skill)
//         res.status(200).send('Success')
//     } catch (err) {
//         res.status(500)
//         res.json({ message: 'Error', error: 'Failed to insert new skill -- ' + err })
//     }
// }

router.get("/", getSkills)
router.get("/:id", getSkill)
router.post("/new", newSkill)

module.exports = router
