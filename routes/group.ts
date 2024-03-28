import { Request, Response } from "express"
import { getGroupsDao } from "../helpers/groupDao"

const express = require("express")
const router = express.Router()

// const updateTopSkill = async (req: Request, res: Response) => {
//     try {
//         const { id: personId } = req.params
//         const { skillId } = req.body

//         await updateTopSkillDao(personId, skillId)
//         res.status(200).send()
//     } catch (err) {
//         res.status(500)
//         res.json({ message: 'Error', error: 'Failed to update person skill -- ' + err })
//     }
// }

const getGroups = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        if (!userId) {
            throw Error("user id is required")
        }
        const groups = await getGroupsDao(userId)

        res.status(200).send(groups)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to fetch groups -- " + err })
    }
}

// router.get('/', getPeople);
// router.get('/:id', getPerson);
// router.post('/:id', getCreatePerson);
// router.post('/:id/skill', updatePersonSkill);
// router.post('/:id/topSkill', updateTopSkill);

router.get("/", getGroups)
// router.get("/:id", getGroup)

module.exports = router
