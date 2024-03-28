export const selectUserGroups = (personId: string) => {
    return {
        query: `
        SELECT
            g.group_id as "groupId",
            g.owner_id as "ownerId",
            g.name as "name",
            us.name as "ownerName"
        FROM (
            SELECT
            UNNEST(u.groups) as group_id
            FROM users u
            where u.user_id = $1
        ) u
        JOIN groups g ON g.group_id = u.group_id
        JOIN users us ON g.owner_id = us.user_id
        `,
        params: [personId],
    }
}

// export const getUserGroups
// export const getUserRoles - for those groups
// make group api route
//      create group
//      update group info
//      create invite link - needs to expire
//      only owner / admin can add skills
//
// make insert skill work with groups
//
