import { Request, Response } from 'express';
import { getAllPeopleDao, getAllPersonSkills, getPersonDao } from '../helpers/peopleDao';
import { Person, UserSkill } from '../types/person';
import { getSkillDao } from '../helpers/skillsDao';

const express = require('express');
const router = express.Router();

const getPeople = async (req: Request, res: Response) => {
    try {
        const people = await getAllPeopleDao()
        res.status(200).send(people)
    } catch (err) {
        res.status(500)
        res.json({ message: 'Error', error: 'Failed to fetch people -- ' + err })
    }
}
// 0a567a5a-2142-48c2-808f-573be135e677 user
// 5285103f-5ab3-4367-b019-70b1d6e857a7 skill

const getPerson = async (req: Request, res: Response) => {
    try {
        const { id: personId } = req.params
        const { name, user_id, top_skill_id } = await getPersonDao(personId)
        const topSkill = await getSkillDao(top_skill_id)
        const skills = await getAllPersonSkills(user_id)

        res.status(200).send({
            name,
            id: user_id,
            topSkill,
            skills: skills
        } as Person)
    } catch (err) {
        res.status(500)
        res.json({ message: 'Error', error: 'Failed to fetch person -- ' + err })
    }
}

router.get('/', getPeople);
router.get('/:id', getPerson);

module.exports = router;