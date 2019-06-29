import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ChatRoomItem from './component/chatRoomItem'
import { GET_CHAT_ROOM_DETAIL } from '../graphql'
import { Query } from 'react-apollo'

export default class ChatRoomScreen extends React.Component {
  state = {
    messages: []
  };

  render() {
    return (
      <Query query={GET_CHAT_ROOM_DETAIL} fetchPolicy={"network-only"}
        variables={{ name: "James" }}>
        {({ loading, error, data }) => {
          if(loading) return(null);
          console.log(data.chatRooms)
          const chatRoomItems = data.chatRooms.map((item)=>{
            console.log(item)
            return(
              <ChatRoomItem navigation={this.props.navigation} data={item}  />
            )
          })
          return (
            <ScrollView>
              {console.log(chatRoomItems)}
              {chatRoomItems}
            </ScrollView>
          );
        }}
      </Query>

    );
  }
}
