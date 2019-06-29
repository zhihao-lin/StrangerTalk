import gql from 'graphql-tag';
export default gql`
query ($name:String){
  chatRooms(name:$name) {
    id
    names
    from
    messages
  }
}`;
