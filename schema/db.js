const users = [
    {
        id: "0",
        name: "Alex",
        age: 19,
        description: "How are you ?",
        position: {
            latitude: 23.5,
            longitude: 180 
        }
    },
    {
        id: "1",
        name: "Jane",
        age: 20,
        description: "You only live once",
        position: {
            latitude: 24,
            longitude: 50
        }
    }
]

const db = {
    "users": users
}

module.exports = db;