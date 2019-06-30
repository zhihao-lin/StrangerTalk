import gql from 'graphql-tag';
export default gql`
mutation($from:String!,$to:String!,$message:String!){
  sendMessage(from:$from,to:$to,message:$message){
    id
    from
    names
    messages
  }
}
`;
