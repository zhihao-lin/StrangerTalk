import { createDrawerNavigator, createAppContainer } from "react-navigation";
import MapScreen from "../screens/mapScreen";
import ChatRooms from "../screens/chatRooms";

const MyDrawerNavigator = createDrawerNavigator(
  {
    MapScreen: {
      screen: MapScreen
    },
    ChatRooms: {
      screen: ChatRooms
    }
  },
  {
    initialRouteName: "MapScreen"
  }
);

export default MyDrawerNavigator;
