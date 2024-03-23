import { Entry } from './entry'

export type UserSkill = Entry & {
    name: string,
    rating: 0|1|2|3|4,
    userId: string
}

export type Person = Entry & {
    name: string,
    skills: UserSkill[],
    topSkill: UserSkill,
    auth0: string
}