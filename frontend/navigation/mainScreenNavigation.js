import {  createStackNavigator, createAppContainer } from "react-navigation";
import MapScreen from '../screens/mapScreen'
import ChatRoomScreen from '../screens/chatRoomScreen'

const mainScreenNavigation = createStackNavigator(
    {
        MapScreen: {
            screen: MapScreen,
            navigationOptions: ({ navigation, screenProps }) => ({
                header: null,
            }),
        },
        ChatRoomScreen: {
            screen: ChatRoomScreen,
            navigationOptions: ({ navigation, screenProps }) => ({
              
            }),
        },
        

        //Add New Screen Here
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#00AD65',
            headerTitleStyle: {
                fontFamily: 'Helvetica',
                fontSize: 17,
                color: '#000000',
                letterSpacing: -0.41,
                lineHeight: 22,
                letterSpacing: 0,
                textAlign: 'center',
            }
        },
        
        initialRouteName: 'MapScreen',
    }
);



export default createAppContainer(mainScreenNavigation);
