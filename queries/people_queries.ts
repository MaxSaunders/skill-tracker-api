import { UserSkill } from '../types/person'

export const selectAllPeople = () => `
    SELECT
        u.name,
        u.user_id,
        s.skill_id as top_skill_id,
        s.name as top_skill_name,
        us.rating as top_skill_rating
    FROM users u
    LEFT JOIN skills s
        ON s.skill_id = u.top_skill
    LEFT JOIN user_skills us
        ON s.skill_id = us.skill_id
        AND
        u.user_id = us.user_id
`

export const selectPerson = (personId: string) => `
    SELECT
        user_id,
        name,
        top_skill as top_skill_id
    FROM users
    WHERE user_id = '${personId}'
`

export const selectPersonSkills = (personId: string) => `
    SELECT
        us.skill_id as id,
        us.rating as rating,
        us.user_id as userId,
        s.name as name
    FROM user_skills us
    JOIN skills s
    ON us.skill_id = s.skill_id
    WHERE user_id = '${personId}'
`

export const selectAllPersonSkills = () => `
    SELECT
        skill_id as id,
        rating,
        user_id
    FROM user_skills
`

export const upsertPersonSkill = (personId: string, skill: UserSkill) => `
    INSERT INTO user_skills
        (skill_id, user_id, rating)
    VALUES
        ('${skill.id}', '${personId}', ${skill.rating})
    ON CONFLICT DO
        UPDATE SET rating = ${skill.rating}
`