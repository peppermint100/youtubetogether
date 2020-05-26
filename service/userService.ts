let users: User[] = []

interface User {
    id: string
    name: string
    room: string
}

export const addUser = ({ id, name, room }: User) => {
    name = name?.trim().toLowerCase()
    room = room?.trim().toLowerCase()

    const user: User = {
        id,
        name,
        room
    }
    const checkAlready = users.find(user => user.room === room && user.name === name)

    if (checkAlready) {
        return { error: 'username is already taken' }
    }

    users.push(user);

    return { user }
}

export const removeUser = (id: string) => {
    const toRemove = getUser(id)
    users = users.filter(user => user.id !== id);
    return toRemove
}


export const getUser = (id: string) =>
    users.find(user => user.id === id)

export const getUsersInRoom = (room: string) => {
    return users.filter(user => user.room === room)
}
