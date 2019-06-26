const db = require("./db");
const uuid4 = require("uuid4");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 2;
const SECRET = "just_a_random_secret";
const hash = text => bcrypt.hash(text, SALT_ROUNDS);
const distance_threshold = 100;
const createToken = name =>
  jwt.sign({ name }, SECRET, {
    expiresIn: "1d"
  });

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    neighbors: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return db.users.filter(user => {
          let distance = Math.sqrt(
            Math.pow(user.latitude - parent.latitude, 2) +
              Math.pow(user.longitude - parent.longitude, 2)
          );
          return distance < distance_threshold && user.id !== parent.id;
        });
      }
    }
  })
});

const ChatRoomType = new GraphQLObjectType({
  name: "ChatRoom",
  fields: () => ({
    id: { type: GraphQLID },
    userIDs: { type: new GraphQLList(GraphQLID) },
    messages: { type: new GraphQLList(new GraphQLList(GraphQLString)) }
  })
});
const Token = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    token: { type: GraphQLString }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return db.users;
      }
    },

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        let user = db.users.find(user => user.id === args.id);
        return user;
      }
    },

    chatRooms: {
      type: new GraphQLList(ChatRoomType),
      args: { userID: { type: GraphQLID } },
      resolve(parent, args) {
        let chatRooms = db.chatRooms.filter(chatRoom => {
          return chatRoom.userIDs.includes(args.userID);
        });
        return chatRooms;
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        latitude: { type: new GraphQLNonNull(GraphQLFloat) },
        longitude: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        let user = {
          id: uuid4(),
          name: args.name,
          age: args.age,
          password: args.password,
          description: args.description,
          latitude: args.latitude,
          longitude: args.longitude
        };

        db.users.push(user);
        return user;
      }
    },
    login: {
      type: Token,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let login = {
          name: args.name,
          password: args.password
        };
        const user = db.users.find(user => user.name === login.name);
        if (!user) throw new Error("Account Not Exists");
        const passwordIsValid = bcrypt.compare(login.password, login.password);
        if (!passwordIsValid) throw new Error("Wrong Password");
        return { token: createToken(login.name) };
      }
    },
    sendMessage: {
      type: ChatRoomType,
      args: {
        from: { type: new GraphQLNonNull(GraphQLID) },
        to: { type: new GraphQLNonNull(GraphQLID) },
        message: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let chatRoom = db.chatRooms.find(chatRoom => {
          return (
            chatRoom.userIDs.includes(args.from) &&
            chatRoom.userIDs.includes(args.to)
          );
        });

        if (chatRoom === undefined) {
          let newChatRoom = {
            id: uuid4(),
            userIDs: [args.from, args.to],
            messages: [[args.from, args.message]]
          };
          db.chatRooms.push(newChatRoom);
          return newChatRoom;
        } else {
          chatRoom.messages.push([args.from, args.message]);
          return chatRoom;
        }
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
