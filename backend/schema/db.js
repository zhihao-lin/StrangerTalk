let users = [
  {
    id: "0",
    name: "Alex",
    age: 19,
    password: "a123",
    description: "我在醉月湖",
    latitude: 25.020489,
    longitude: 121.537682
  },

  {
    id: "1",
    name: "Jane",
    age: 20,
    password: "a123",
    description: "一起吃鬆餅嗎？",
    latitude: 25.015576,
    longitude: 121.537467
  },

  {
    id: "2",
    name: "Peter",
    age: 19,
    password: "a123",
    description: "找圖書朋友",
    latitude: 25.017485,
    longitude: 121.540481
  }
];

let chatRooms = [
  {
    id: "chatroom_0",
    userIDs: ["0", "1"],
    messages: [["0", "Hi"], ["1", "How are you"], ["0", "fine, and you?"]]
  },

  {
    id: "chatroom_1",
    userIDs: ["1", "2"],
    messages: [
      ["1", "Do you want to have dinner with me?"],
      ["2", "Of course, why not"],
      ["1", "Cool, see you at front gate in 5 minutes"]
    ]
  }
];

const db = {
  users: users,
  chatRooms: chatRooms
};

module.exports = db;
