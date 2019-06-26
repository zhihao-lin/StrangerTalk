import { createDrawerNavigator, createAppContainer } from "react-navigation";

import ChatRoomScreen from "../screens/chatRoomScreen";

const MyDrawerNavigator = createDrawerNavigator({
  ChatRoomScreen: {
    screen: ChatRoomScreen
  }
});

export default ChatroomNavigator;
