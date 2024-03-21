import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Skill } from '../types/skill';
import { addSkillDao, getAllSkillsDao } from '../helpers/skillsDao';

const express = require('express');
const router = express.Router();

const getSkills = async (req: Request, res: Response) => {
    try {
        const skills = await getAllSkillsDao()
        res.send(skills)
    } catch (err) {
        res.status(500)
        res.json({ message: 'Error', error: 'Failed to fetch skills -- ' + err })
    }
}

const newSkill = async (req: Request, res: Response) => {
    try {
        const {name, description} = req.body
        const id = uuid()
        const skill = {
            id,
            name,
            description
        } as Skill
        await addSkillDao(skill)
        res.status(200).send('Success')
    } catch (err) {
        res.status(500)
        res.json({ message: 'Error', error: 'Failed to insert new skill -- ' + err })
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

router.get('/', getSkills)
router.get('/new', newSkill)

module.exports = router