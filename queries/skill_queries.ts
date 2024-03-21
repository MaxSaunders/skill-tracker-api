import { Skill } from '../types/skill'

export const selectAllSkillsQuery = () => `
    SELECT *
    FROM skills
`

export const selectSkillQuery = (skillId: string) => `
    SELECT *
    FROM skills
    WHERE skill_id = '${skillId ?? 0}'
`

export const insertSkill = (skill: Skill) => `
    INSERT into skills
    (name, skill_id, description)
    VALUES
    ('${skill.name}', '${skill.id}', '${skill.description}')
`

export const deleteSkill = (skillId: string) => `
    DELETE from skills
    WHERE skill_id = '${skillId}'
`
