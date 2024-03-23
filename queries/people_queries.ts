import { Person, UserSkill } from '../types'

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
        top_skill as top_skill_id,
        auth0_id as "auth0"
    FROM users
    WHERE user_id::text = '${personId}'::text OR auth0_id = '${personId}'
`

export const selectPersonSkills = (personId: string) => `
    SELECT
        us.skill_id as id,
        us.rating as rating,
        us.user_id as "userId",
        s.name as name
    FROM user_skills us
    JOIN skills s
    ON us.skill_id = s.skill_id
    WHERE user_id::text = '${personId}'::text
`

export const selectAllPersonSkills = () => `
    SELECT
        us.skill_id as id,
        us.rating,
        us.user_id as "userId",
        s.name
    FROM user_skills us
    JOIN skills s
    ON us.skill_id = s.skill_id
`

export const selectPersonSkill = (personId: string, skillId: string) => `
    SELECT
        us.skill_id as id,
        us.rating,
        us.user_id as "userId",
        s.name
    FROM user_skills us
    JOIN skills s
        ON us.skill_id = s.skill_id
    WHERE user_id::text = '${personId}'::text
    AND us.skill_id = '${skillId}'
`

export const upsertPersonSkill = (personId: string, skillId: string, rating: number) => `
    INSERT INTO user_skills
        (skill_id, user_id, rating)
    VALUES
        ('${skillId}', '${personId}', ${rating})
    ON CONFLICT (skill_id, user_id)
    DO UPDATE SET rating = ${rating}
`

export const insertPerson = (person: Person) => `
    INSERT INTO users
        (name, user_id, auth0_id)
    VALUES
        ('${person.name}', '${person.id}', '${person.auth0}')
`

export const updateTopSkill = (personId: string, skillId: string) => `
    UPDATE users
    SET top_skill = '${skillId}'
    WHERE user_id::text = '${personId}'::text OR auth0_id::text = '${personId}'::text
`