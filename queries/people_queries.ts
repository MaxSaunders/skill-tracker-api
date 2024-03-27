import { Person } from "../types"

export const selectAllPeople = () => {
    return {
        query: `
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
        `,
        params: [],
    }
}

export const selectPerson = (personId: string) => {
    return {
        query: `
            SELECT
                user_id,
                name,
                top_skill as top_skill_id,
                auth0_id as "auth0"
            FROM users
            WHERE user_id::text = $1::text OR auth0_id = $2
        `,
        params: [personId, personId],
    }
}

export const selectPersonSkills = (personId: string) => {
    return {
        query: `
            SELECT
                us.skill_id as id,
                us.rating as rating,
                us.user_id as "userId",
                s.name as name
            FROM user_skills us
            JOIN skills s
            ON us.skill_id = s.skill_id
            WHERE user_id::text = $1::text
        `,
        params: [personId],
    }
}

export const selectAllPersonSkills = () => {
    return {
        query: `
            SELECT
                us.skill_id as id,
                us.rating,
                us.user_id as "userId",
                s.name
            FROM user_skills us
            JOIN skills s
            ON us.skill_id = s.skill_id
        `,
        params: [],
    }
}

export const selectPersonSkill = (personId: string, skillId: string) => {
    return {
        query: `
            SELECT
                us.skill_id as id,
                us.rating,
                us.user_id as "userId",
                s.name
            FROM user_skills us
            JOIN skills s
                ON us.skill_id = s.skill_id
            WHERE user_id::text = $1::text
            AND us.skill_id = $2
        `,
        params: [personId, skillId],
    }
}

export const upsertPersonSkill = (personId: string, skillId: string, rating: number) => {
    return {
        query: `
            INSERT INTO user_skills
                (skill_id, user_id, rating)
            VALUES
                ($1, $2, $3)
            ON CONFLICT (skill_id, user_id)
            DO UPDATE SET rating = $4
            `,
        params: [skillId, personId, rating, rating],
    }
}

export const insertPerson = (person: Person) => {
    return {
        query: `
            INSERT INTO users
                (name, user_id, auth0_id)
            VALUES
                ($1, $2, $3)
            `,
        params: [person.name, person.id, person.auth0],
    }
}

export const updateTopSkill = (personId: string, skillId: string) => {
    return {
        query: `
            UPDATE users
            SET top_skill = $1
            WHERE user_id::text = $2::text OR auth0_id::text = $3::text
        `,
        params: [skillId, personId, personId],
    }
}
