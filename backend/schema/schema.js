const db = require('./db');
const uuid4 = require('uuid4');
const graphql = require('graphql');
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

const distance_threshold = 100;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID}, 
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        description: {type: GraphQLString}, 
        latitude: {type: GraphQLFloat},
        longitude: {type: GraphQLFloat},
        neighbors: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return db.users.filter(user => {
                    let distance = Math.sqrt(Math.pow(user.latitude - parent.latitude, 2) + Math.pow(user.longitude - parent.longitude, 2));
                    return (distance < distance_threshold) && (user.id !== parent.id);
                })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return db.users;
            }
        },

        user: {
            type: UserType, 
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                let user = db.users.find(user => user.id === args.id);
                return user;
            }
        }
    })
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: () => ({
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                description: {type: GraphQLString},
                latitude: {type: new GraphQLNonNull(GraphQLFloat)}, 
                longitude: {type: new GraphQLNonNull(GraphQLFloat)}
            }, 
            resolve(parent, args){
                let user = {
                    id: uuid4(),
                    name: args.name,
                    age: args.age,
                    description: args.description,
                    latitude: args.latitude,
                    longitude: args.longitude
                }
                
                db.users.push(user);
                return user;
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})