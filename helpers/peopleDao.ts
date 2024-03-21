import { UserSkill } from '../types/person'
import { selectPerson, selectAllPeople, selectPersonSkills } from '../queries/people_queries'
import { runQuery } from './runQuery'

interface DaoPerson {
    name: string,
    user_id: string,
    top_skill_id: string,
    top_skill_name: string,
    top_skill_rating: string,
}

export const getPersonDao = async (personId: string) => {
    const result = await runQuery<DaoPerson[]>(selectPerson(personId))
    return result[0]
}

export const getAllPeopleDao = async () => {
    return await runQuery<DaoPerson[]>(selectAllPeople())
}

export const getAllPersonSkills = async (personId: string) => {
    return await runQuery<UserSkill[]>(selectPersonSkills(personId))
}

// export const addPerson = async (person: Person) => {
//     return await runQuery(insertPerson(person))
// }
// TESTING