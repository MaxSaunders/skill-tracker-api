import { selectUserGroups } from "../queries/group_queries"
import { Group } from "../types/group"
import { runQuery } from "./runQuery"

export const getGroupsDao = async (userId: string) => {
    try {
        const { query, params } = selectUserGroups(userId)
        // console.log({ query, params })
        return await runQuery<Group[]>(query, params)
    } catch (err) {
        throw Error("GET GROUPS ERROR\n\n")
    }
}
