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

export default class ChatRoomScreen extends React.Component {
  state = {
    messages: []
  };

  render() {
    return (
      <ScrollView>
        <ChatRoomItem navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}
