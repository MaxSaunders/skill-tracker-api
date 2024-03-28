import { Entry } from "./entry"
import { Skill } from "./skill"

export type GroupUser = Entry & {
    name: string
}

export type Group = Entry & {
    name: string
    admin: GroupUser[]
    skills: Skill[]
}
