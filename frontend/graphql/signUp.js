import gql from 'graphql-tag';
export default gql`
mutation  ($name:String!,$age:Int!,$password:String!,$description:String,$latitude:Float!,$longitude:Float!){
    addUser(name:$name,age:$age,password:$password,description:$description,latitude:$latitude,longitude:$longitude) {
      id
      name
    } 
  }`;
