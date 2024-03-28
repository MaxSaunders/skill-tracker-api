import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import {
    getAllPeopleDao,
    getPersonSkills,
    getAllPersonSkills,
    getPersonDao,
    addPersonDao,
    DaoPerson,
    updatePersonSkillDao,
    getPersonSkillDao,
    updateTopSkillDao,
    updatePersonDao,
} from "../helpers/peopleDao"
import { Person } from "../types"

const express = require("express")
const router = express.Router()

const getPersonSkillsHelper = async (person: DaoPerson) => {
    const { user_id, top_skill_id } = person

    const skills = await getPersonSkills(user_id)
    const topSkill = skills.find((s) => s.id == top_skill_id && user_id == s.userId)

    return { skills, topSkill }
}

const getPeople = async (req: Request, res: Response) => {
    try {
        const people = await getAllPeopleDao()
        const skills = await getAllPersonSkills()

        const fullPeople = people.map((p) => {
            const personSkills = skills.filter((s) => s.userId == p.user_id)
            const topSkill = skills.find((s) => s.id == p.top_skill_id && p.user_id == s.userId)

            return {
                id: p.user_id,
                name: p.name,
                skills: personSkills,
                topSkill,
            } as Person
        })
        res.status(200).send(fullPeople)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to fetch people -- " + err })
    }
}

const getPerson = async (req: Request, res: Response) => {
    try {
        const { id: personId } = req.params
        const daoPerson = await getPersonDao(personId)
        const { skills, topSkill } = await getPersonSkillsHelper(daoPerson)

        res.status(200).send({
            name: daoPerson.name,
            id: daoPerson.user_id,
            topSkill,
            skills: skills,
            email: daoPerson.email,
            phone: daoPerson.phone,
        } as Person)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to fetch person -- " + err })
    }
}

const updatePerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const daoPerson = await getPersonDao(id)
        if (!daoPerson) {
            throw Error("Person not found")
        }

        const { name, email, phone } = req.body
        const personObj = { id, name, email, phone } as Person
        updatePersonDao(personObj)

        res.status(200).send(personObj)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to update person -- " + err })
    }
}

const getCreatePerson = async (req: Request, res: Response) => {
    try {
        const { id: personId } = req.params
        let daoPerson = await getPersonDao(personId)
        // let daoPerson = await getPersonAuthDao(personId)

        if (!daoPerson) {
            const userId = uuid()
            const { name, auth0 } = req.body

            if (!name) {
                throw Error("No name provided")
            }
            if (!auth0) {
                throw Error("No auth0 provided")
            }
            await addPersonDao({ name, auth0, id: userId } as Person)
            daoPerson = await getPersonDao(auth0)
        }

        const { skills, topSkill } = await getPersonSkillsHelper(daoPerson)

        res.status(200).send({
            name: daoPerson.name,
            id: daoPerson.user_id,
            topSkill,
            skills: skills,
        } as Person)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to create person -- " + err })
    }
}

const updatePersonSkill = async (req: Request, res: Response) => {
    try {
        const { id: personId } = req.params
        const { skillId, rating } = req.body

        const daoPerson = await getPersonDao(personId)

        await updatePersonSkillDao(daoPerson.user_id, skillId, rating)
        // The skill table uses userId so we need to ensure we have the proper userId uuid
        const personSkill = getPersonSkillDao(personId, skillId)

        res.status(200).send(personSkill)
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to update person skill -- " + err })
    }
}

const updateTopSkill = async (req: Request, res: Response) => {
    try {
        const { id: personId } = req.params
        const { skillId } = req.body

        await updateTopSkillDao(personId, skillId)
        res.status(200).send()
    } catch (err) {
        res.status(500)
        res.json({ message: "Error", error: "Failed to update top skill -- " + err })
    }
}

router.get("/", getPeople)
router.get("/:id", getPerson)
router.post("/:id", getCreatePerson)
router.post("/:id/update", updatePerson)
router.post("/:id/skill", updatePersonSkill)
router.post("/:id/topSkill", updateTopSkill)

module.exports = router
