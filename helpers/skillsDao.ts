import { insertSkill, selectAllSkillsQuery, selectSkillQuery } from '../queries/skill_queries'
import { Skill } from '../types/skill'
import { runQuery } from './runQuery'

export const getSkillDao = async (skillId: string) => {
    return await runQuery(selectSkillQuery(skillId))
}

export const getAllSkillsDao = async () => {
    return await runQuery(selectAllSkillsQuery())
}

export const addSkillDao = async (skill: Skill) => {
    return await runQuery(insertSkill(skill))
}