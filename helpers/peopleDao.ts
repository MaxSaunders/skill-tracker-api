import { Person, UserSkill } from "../types"
import {
    selectPerson,
    selectAllPeople,
    selectPersonSkills,
    selectAllPersonSkills,
    selectPersonSkill,
    insertPerson,
    upsertPersonSkill,
    updateTopSkill,
    updatePerson,
} from "../queries/people_queries"
import { runQuery } from "./runQuery"

export interface DaoPerson {
    name: string
    user_id: string
    top_skill_id: string
    top_skill_name: string
    top_skill_rating: string
    email: string
    phone: string
}

export const getPersonDao = async (personId: string) => {
    try {
        const { query, params } = selectPerson(personId)
        const result = await runQuery<DaoPerson[]>(query, params)
        return result[0]
    } catch (err) {
        throw Error("GET PERSON ERROR\n\n")
    }
}

export const updatePersonDao = async (person: Person) => {
    try {
        const { query, params } = updatePerson(person)
        return await runQuery<void>(query, params)
    } catch (err) {
        throw Error("UPDATE PERSON ERROR\n\n")
    }
}

// export const getPersonAuthDao = async (personId: string) => {
//     try {
//         const result = await runQuery<DaoPerson[]>(selectPersonWithAuth(personId))
//         return result[0]
//         // TODO: possible refactor to not return rows []
//     } catch (err) {
//         throw Error('GET PERSON ERROR\n\n')
//     }
// }

export const getAllPeopleDao = async () => {
    try {
        const { query } = selectAllPeople()
        return await runQuery<DaoPerson[]>(query)
    } catch (err) {
        throw Error("GET ALL PERSON ERROR\n\n")
    }
}

export const getPersonSkills = async (personId: string) => {
    try {
        const { query, params } = selectPersonSkills(personId)
        return await runQuery<UserSkill[]>(query, params)
    } catch (err) {
        throw Error("GET ALL PERSON SKILLS ERROR\n\n")
    }
}

export const getAllPersonSkills = async () => {
    try {
        const { query } = selectAllPersonSkills()
        return await runQuery<UserSkill[]>(query)
    } catch (err) {
        throw Error("GET ALL PERSON SKILLS ERROR\n\n")
    }
}

export const addPersonDao = async (person: Person) => {
    const { query, params } = insertPerson(person)
    return await runQuery<void>(query, params)
}

export const updatePersonSkillDao = async (userId: string, skillId: string, rating: number) => {
    const { query, params } = upsertPersonSkill(userId, skillId, rating)
    return await runQuery<void>(query, params)
}

export const getPersonSkillDao = async (userId: string, skillId: string) => {
    const { query, params } = selectPersonSkill(userId, skillId)
    return await runQuery<UserSkill>(query, params)
}

export const updateTopSkillDao = async (userId: string, skillId: string) => {
    const { query, params } = updateTopSkill(userId, skillId)
    return await runQuery<void>(query, params)
}
