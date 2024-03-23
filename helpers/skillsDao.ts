import { insertSkill, selectAllSkillsQuery, selectSkillQuery } from '../queries/skill_queries'
import { Skill } from '../types'
import { runQuery } from './runQuery'

export interface DaoSkill {
    name: string,
    id: string,
    description: string
}

export const getSkillDao = async (skillId: string) => {
    const result = await runQuery<DaoSkill[]>(selectSkillQuery(skillId))
    // TODO: possible refactor to not return rows []
    return result[0]
}

export const getAllSkillsDao = async () => {
    return await runQuery<DaoSkill[]>(selectAllSkillsQuery())
}

export const addSkillDao = async (skill: Skill) => {
    return await runQuery(insertSkill(skill))
}