import { Request, Response } from 'express';
import { Person, UserSkill } from '../types/person';

const express = require('express');
const router = express.Router();

const getPeople = (req: Request, res: Response) => {
    res.send(
        [
            {
                id: '12345678',
                name: 'Max Saunders',
                skills: [],
                topSkill: {} as UserSkill
            } as Person,
            {
                id: '87654321',
                name: 'Chris Foster',
                skills: [],
                topSkill: {} as UserSkill
            } as Person
        ]
    )
}

const getPerson = (req: Request, res: Response) => {
    res.send({
        id: 'idstring',
        name: 'Max Saunders',
        skills: [],
        topSkill: {} as UserSkill
    } as Person)
}

router.get('/', getPeople);
router.get('/:id', getPerson);

module.exports = router;