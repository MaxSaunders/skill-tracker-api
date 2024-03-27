import { insertSkill, selectAllSkillsQuery, selectSkillQuery } from "../queries/skill_queries"
import { Skill } from "../types"
import { runQuery } from "./runQuery"

export interface DaoSkill {
    name: string
    id: string
    description: string
}

export const getSkillDao = async (skillId: string) => {
    const { query, params } = selectSkillQuery(skillId)
    const result = await runQuery<DaoSkill[]>(query, params)
    // TODO: possible refactor to not return rows []
    return result[0]
}

export const getAllSkillsDao = async () => {
    const { query } = selectAllSkillsQuery()
    return await runQuery<DaoSkill[]>(query)
}

export const addSkillDao = async (skill: Skill) => {
    const { query, params } = insertSkill(skill)
    return await runQuery(query, params)
}
