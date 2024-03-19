import { Request, Response } from 'express';
import { Person, UserSkill } from '../types/person';

const getPeople = (req: Request, res: Response) => {
    // res.status(200)
    res.send([{
        id: 'idstring',
        name: 'Max Saunders',
        skills: [],
        topSkill: {} as UserSkill
    } as Person])
}

const getPerson = (req: Request, res: Response) => {
    res.send({
        id: 'idstring',
        name: 'Max Saunders',
        skills: [],
        topSkill: {} as UserSkill
    } as Person)
}

module.exports = {
    getPeople,
    getPerson
}