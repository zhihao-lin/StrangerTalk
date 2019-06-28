import { createStackNavigator, createAppContainer } from "react-navigation";

import ChatRoomScreen from "../screens/chatRoomScreen";
import ChatRoomDetail from '../screens/chatRoomDetail'


const ChatroomNavigator = createStackNavigator(
  {
  ChatRoomScreen: {
    screen: ChatRoomScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
    })
  },
  ChatRoomDetail: {
    screen: ChatRoomDetail
  },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
    header: null
  })
},
);

export default ChatroomNavigator;
