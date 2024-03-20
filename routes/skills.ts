import { Request, Response } from 'express';
import { Skill } from '../types/skill';

const express = require('express');
const router = express.Router();

const getSkills = (req: Request, res: Response) => {
    // res.status(200)
    res.send(
        [
            {
                id: '12345678',
                name: 'Java',
                description: 'The java programming language'
            } as Skill,
            {
                id: '87654321',
                name: '.NET',
                description: 'The microsoft .NET language framework for the language C#'
            } as Skill
        ]
    )
}

router.get('/', getSkills)

module.exports = router