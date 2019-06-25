const users = [
    {
        id: "0",
        name: "Alex",
        age: 19,
        description: "我在醉月湖",
        latitude: 25.020489, 
        longitude: 121.537682
    },

    {
        id: "1",
        name: "Jane",
        age: 20,
        description: "一起吃鬆餅嗎？",
        latitude: 25.015576,
        longitude: 121.537467
    },

    {
        id: "2", 
        name: "Peter", 
        age: 19, 
        description: "找圖書朋友",
        latitude: 25.017485, 
        longitude: 121.540481
    }
]

const db = {
    "users": users
}

module.exports = db;