const users = [
    {
        id: "0",
        name: "Alex",
        age: 19,
        description: "How are you ?",
        latitude: 23.5,
        longitude: 180 
    },

    {
        id: "1",
        name: "Jane",
        age: 20,
        description: "You only live once",
        latitude: 24,
        longitude: 182
    },

    {
        id: "2", 
        name: "Peter", 
        age: 6, 
        description: "I love pudding os much",
        latitude: 23, 
        longitude: 178
    }
]

const db = {
    "users": users
}

module.exports = db;