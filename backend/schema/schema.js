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

const User = require("./models/User");
const ChatRoom = require("./models/ChatRoom");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//const SALT_ROUNDS = 2;
const SECRET = "webfinal";
const hash = text => bcrypt.hash(text, SALT_ROUNDS);
const distance_threshold = 0.01;
const createToken = ({ name, id }) =>
  jwt.sign({ name, id }, SECRET, {
    expiresIn: "3d"
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
      async resolve(parent, args) {
        let users = await User.find({});
        let neighbors = await users.filter(user => {
          let distance = Math.sqrt(
            Math.pow(user.latitude - parent.latitude, 2) +
              Math.pow(user.longitude - parent.longitude, 2)
          );
          return distance < distance_threshold && user.id !== parent.id;
        });

        return neighbors;
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        let users = await User.find({});
        let me = await User.findOne({ name: parent.name });
        let friends = await users.filter(user => {
          return me.friends.includes(user.name);
        });

        return friends;
      }
    }
  })
});

const ChatRoomType = new GraphQLObjectType({
  name: "ChatRoom",
  fields: () => ({
    id: { type: GraphQLID },
    names: { type: new GraphQLList(GraphQLString) },
    from: { type: new GraphQLList(GraphQLString) },
    messages: { type: new GraphQLList(GraphQLString) }
  })
});

const Token = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    token: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        let users = await User.find();
        return users;
      }
    },

    user: {
      type: UserType,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args, context) {
        //if (context.me == null) throw new Error("please log in");
        let user = await User.findOne({ name: args.name });
        return user;
      }
    },

    chatRooms: {
      type: new GraphQLList(ChatRoomType),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args, context) {
        if (context.me == null) throw new Error("please log in");
        let chatRoomsAll = await ChatRoom.find({});
        let chatRooms = chatRoomsAll.filter(room => {
          return room.names.includes(args.name);
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
        const user = db.users.find(e => e.name == args.name);
        if (user) {
          throw new Error("User name already exist!");
        } else {
          let user = {
            name: args.name,
            age: args.age,
            password: args.password,
            description: args.description,
            latitude: args.latitude,
            longitude: args.longitude
          };

          const new_user = new User(user);
          new_user.save(err => {
            if (err) console.log("Error: Failed to create new User");
          });
          return user;
        }
      }
    },

    updateLocation: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        latitude: { type: new GraphQLNonNull(GraphQLFloat) },
        longitude: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      async resolve(parent, args, context) {
        if (context.me == null) throw new Error("please log in");

        if (context.me.name != args.name && context.me.name !== "Boss")
          throw new Error("You are not authorized");
        let user = await User.findOne({ name: args.name });

        if (user === null) {
          throw new Error("User can't be found");
        } else {
          user.latitude = args.latitude;
          user.longitude = args.longitude;

          await User.updateOne(
            { name: user.name },
            { latitude: user.latitude, longitude: user.longitude }
          );

          return user;
        }
      }
    },

    removeUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args, context) {
        if (context.me == null) throw new Error("please log in");
        if (context.me.name != args.name && context.me.name !== "Boss")
          throw new Error("You are not authorized");
        return User.deleteOne({ name: args.name });
      }
    },

    login: {
      type: Token,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        let login = {
          name: args.name,
          password: args.password
        };
        let user = await User.findOne({ name: args.name });
        if (!user) throw new Error("Account Not Exists");
        const passwordIsValid = await bcrypt.compare(
          login.password,
          user.password
        );
        if (login.password !== user.password) throw new Error("Wrong Password");

        let token = await {
          token: createToken(user),
          id: user.id,
          name: user.name
        };
        return token;
      }
    },

    sendMessage: {
      type: ChatRoomType,
      args: {
        from: { type: new GraphQLNonNull(GraphQLString) },
        to: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args, context) {
        if (context.me == null) throw new Error("please log in");
        if (context.me.name != args.from && context.me.name !== "Boss")
          throw new Error("You are not authorized");
        let chatRoomsAll = await ChatRoom.find({});
        let chatRoom = chatRoomsAll.find(room => {
          return room.names.includes(args.from) && room.names.includes(args.to);
        });
        let user1 = await User.findOne({ name: args.from });
        let user2 = await User.findOne({ name: args.to });

        let distance = Math.sqrt(
          Math.pow(user1.latitude - user2.latitude, 2) +
            Math.pow(user1.longitude - user2.longitude, 2)
        );
        let addfriend = user1.friends.find(friend => {
          return friend == user2.name;
        });

        if (!addfriend) {
          user1.friends.push(user2.name);

          await User.updateOne(
            { name: user1.name },
            { friends: user1.friends }
          );
        }

        if (distance > distance_threshold)
          throw new Error("You guys are too far to chat");
        if (chatRoom === undefined) {
          let chatRoomData = {
            names: [args.from, args.to],
            from: [args.from],
            messages: [args.message]
          };

          const newChatRoom = new ChatRoom(chatRoomData);
          newChatRoom.save(err => {
            console.log("Error: Failed to save ChatRoom");
            console.log(err);
          });
          return chatRoomData;
        } else {
          chatRoom.from.push(args.from);
          chatRoom.messages.push(args.message);

          await ChatRoom.updateOne(
            { names: chatRoom.names },
            { from: chatRoom.from, messages: chatRoom.messages }
          );
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
