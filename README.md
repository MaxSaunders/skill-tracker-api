# skill-tracker-api
Node Api for Skill Tracker Project

### TODO: write out the API contract

# People

### GET /people

__Returns__ array of type Person

```
[
    {
        name: string,
        auth0: string,
        userId: uuid,
        topSkill: {},
        skills: []
    }
]
```

### GET /people/:id

__Returns__ a Person object

```
{
    name: string,
    auth0: string,
    userId: uuid,
    topSkill: {},
    skills: []
}
```

### POST /people/:id

Used to create a new user or get user by either userId or Auth0Id

__Request__

```
{
    auth0: string,
    name: string
}
```

__Returns__ a Person Object

```
{
    name: string,
    auth0: string,
    userId: uuid,
    topSkill: {},
    skills: []
}
```

# Skills

### GET /skills

__Returns__ a list of all skills being tracked

```
[
    {
        id: uuid,
        name: string,
        description: string
    }
]
```

### GET /skills/:id

__Returns__ a single skill object

```
{
    id: uuid,
    name: string,
    description: string
}
```

### POST /new

Creates a new skill to track

__Request__

```
{
    name: string,
    description: string
}
```