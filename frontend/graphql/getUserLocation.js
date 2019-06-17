import gql from 'graphql-tag';
export default gql`
query {
  users {
    id
    name
    age
    description
    latitude
    longitude
    neighbors {
      id
      name
    }
  } 
}`;
