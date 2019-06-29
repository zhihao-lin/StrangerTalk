import gql from 'graphql-tag';
export default gql`
query {
  user(name:"Allen") {
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
