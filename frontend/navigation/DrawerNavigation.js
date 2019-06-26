import {  createDrawerNavigator, createAppContainer } from "react-navigation";
import MapScreen from '../screens/mapScreen'
import ChatRoomScreen from '../screens/chatRoomScreen'





const MyDrawerNavigator = createDrawerNavigator(
    {
        MapScreen: {
        screen: MapScreen,
        },
        ChatRoomScreen: {
        screen: ChatRoomScreen,
        },
     },
  {
       
        
        initialRouteName: 'MapScreen',
    }
  
  );
  

export default MyDrawerNavigator