import { Skill } from "../types"

export const selectAllSkillsQuery = () => {
    return {
        query: `
            SELECT
                name,
                skill_id as "id",
                description
            FROM skills
            `,
        params: [],
    }
}

export const selectSkillQuery = (skillId: string) => {
    return {
        query: `
            SELECT
                name,
                skill_id as "id",
                description
            FROM skills
            WHERE skill_id = $1
        `,
        params: [skillId ?? 0],
    }
}

export const insertSkill = (skill: Skill) => {
    return {
        query: `
            INSERT into skills
            (name, skill_id, description)
            VALUES
            ($1, $2, $3)
        `,
        params: [skill.name, skill.id, skill.description],
    }
}

export const deleteSkill = (skillId: string) => {
    return {
        query: `
            DELETE from skills
            WHERE skill_id = $1
        `,
        params: [skillId],
    }
}
