import { Person, UserSkill } from '../types'
import { selectPerson,
    selectAllPeople,
    selectPersonSkills,
    selectAllPersonSkills,
    selectPersonSkill,
    insertPerson,
    upsertPersonSkill,
    updateTopSkill
} from '../queries/people_queries'
import { runQuery } from './runQuery'

export interface DaoPerson {
    name: string,
    user_id: string,
    top_skill_id: string,
    top_skill_name: string,
    top_skill_rating: string,
}

export const getPersonDao = async (personId: string) => {
    try {
        const result = await runQuery<DaoPerson[]>(selectPerson(personId))
        return result[0]
        // TODO: possible refactor to not return rows []
    } catch (err) {
        throw Error('GET PERSON ERROR\n\n')
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
        return await runQuery<DaoPerson[]>(selectAllPeople())
    } catch (err) {
        throw Error('GET ALL PERSON ERROR\n\n')
    }
}

export const getPersonSkills = async (personId: string) => {
    try {
        return await runQuery<UserSkill[]>(selectPersonSkills(personId))
    } catch (err) {
        throw Error('GET ALL PERSON SKILLS ERROR\n\n')
    }
}

export const getAllPersonSkills = async () => {
    try {
        return await runQuery<UserSkill[]>(selectAllPersonSkills())
    } catch (err) {
        throw Error('GET ALL PERSON SKILLS ERROR\n\n')
    }
}

export const addPersonDao = async (person: Person) => {
    return await runQuery<void>(insertPerson(person))
}

export const updatePersonSkillDao = async (userId: string, skillId: string, rating: number) =>{
    return await runQuery<void>(upsertPersonSkill(userId, skillId, rating))
}

export const getPersonSkillDao = async (userId: string, skillId: string) => {
    return await runQuery<UserSkill>(selectPersonSkill(userId, skillId))
}

export const updateTopSkillDao = async (userId: string, skillId: string) => {
    return await runQuery<void>(updateTopSkill(userId, skillId))
}