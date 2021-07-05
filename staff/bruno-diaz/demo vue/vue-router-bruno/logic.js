function retrieveTodos() {
    return data.filter(item => item.type === 'todo')
}

function retrieveWishes() {
    return data.filter(item => item.type === 'wish')
}