import gql from 'graphql-tag';
export default gql`
mutation  ($name:String!,$password:String!){
  login(name:$name,password:$password) {
    token
    id
    name
  } 
}
`;
