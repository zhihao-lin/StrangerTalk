import gql from 'graphql-tag';
export default gql`
query ($name:String!){
  user(name:$name) {
    id
    name
    age
    description
    latitude
    longitude
    neighbors {
      id
      name
      age
      password
      description
      latitude
      longitude     
    }
  } 
}`;
