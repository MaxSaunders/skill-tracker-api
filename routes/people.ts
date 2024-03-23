import { Request, Response, response } from 'express';
import { getAllPeopleDao, getPersonSkills, getAllPersonSkills, getPersonDao, getPersonAuthDao, addPersonDao, DaoPerson } from '../helpers/peopleDao';
import { Person } from '../types';
import { v4 as uuid } from 'uuid';
import { getSkillDao } from '../helpers/skillsDao';

const express = require('express');
const router = express.Router();

const getPersonSkillsHelper = async (person: DaoPerson) => {
    const { user_id, top_skill_id } = person

    const skills = await getPersonSkills(user_id)
    const topSkill = skills.find(s => s.id == top_skill_id && user_id == s.userId)

    return { skills, topSkill }
}

const getPeople = async (req: Request, res: Response) => {
    try {
        const people = await getAllPeopleDao()
        const skills = await getAllPersonSkills()

        const fullPeople = people.map(p => {
            const personSkills = skills.filter(s => s.userId == p.user_id)
            const topSkill = skills.find(s => s.id == p.top_skill_id && p.user_id == s.userId)

            return {
                id: p.user_id,
                name: p.name,
                skills: personSkills,
                topSkill
            } as Person
        })
        res.status(200).send(fullPeople)
    } catch (err) {
        res.status(500)
        res.json({ message: 'Error', error: 'Failed to fetch people -- ' + err })
    }
}

const getPerson = async (req: Request, res: Response) => {
    // Currently only works with userId not AUTH0 sub
    try {
        const { id: personId } = req.params
        const daoPerson = await getPersonDao(personId)
        const { skills, topSkill } = await getPersonSkillsHelper(daoPerson)

        res.status(200).send({
            name: daoPerson.name,
            id: daoPerson.user_id,
            topSkill,
            skills: skills
        } as Person)
    } catch (err) {
        res.status(500)
        res.json({ message: 'Error', error: 'Failed to fetch person -- ' + err })
    }
}

const getCreatePerson = async (req: Request, res: Response) => {
    // Built to work with userId and AUTH0 sub
    try {
        const { id: personId } = req.params
        let daoPerson = await getPersonAuthDao(personId)

        if (!daoPerson) {
            const userId = uuid()
            const { name, auth0 } = req.body

            if (!name) {
                throw Error('No name provided')
            }
            if (!auth0) {
                throw Error('No auth0 provided')
            }
            await addPersonDao({ name, auth0, id: userId } as Person)
            daoPerson = await getPersonAuthDao(auth0)
        }

        const { skills, topSkill } = await getPersonSkillsHelper(daoPerson)

        res.status(200).send({
            name: daoPerson.name,
            id: daoPerson.user_id,
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
router.post('/:id', getCreatePerson);

module.exports = router;