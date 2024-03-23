import { Skill } from '../types'

export const selectAllSkillsQuery = () => `
    SELECT
        name,
        skill_id as "id",
        description
    FROM skills
`

export const selectSkillQuery = (skillId: string) => `
    SELECT
        name,
        skill_id as "id",
        description
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
