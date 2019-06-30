import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ChatRoomItem from './component/chatRoomItem'
import { GET_CHAT_ROOMS } from '../graphql'
import { Query } from 'react-apollo'



export default class ChatRoomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username:''
    };
    AsyncStorage.getItem('name').then((name) => {
      console.log(name)
      this.setState({username:name})
   })
  }
  
  onLoad = (refetch) => {
    this.props.navigation.addListener('didFocus', () => {
      console.log("reload");
      refetch().then((result) => {
        console.log(result.data);
        // console.log(result.data.doctorInfo.patientToDoctorSyncings);
      });
    });
  }

  render() {
    return (
      <Query query={GET_CHAT_ROOMS} fetchPolicy={"network-only"}
        variables={{ name:this.state.username  }}>
        {({ loading, error, data,refetch }) => {
          if(loading) return(null);
          this.onLoad(refetch);
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
