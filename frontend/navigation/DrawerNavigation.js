import { DrawerItems, createDrawerNavigator, createAppContainer } from "react-navigation";
import MapScreen from "../screens/mapScreen";
import ChatroomNavigator from './ChatroomNavigation'
import React from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import {Text,ScrollView,SafeAreaView,Dimensions} from 'react-native'

const {width ,height}=Dimensions.get('window')

const CustomDrawerContentComponent = props => (
  <ScrollView scrollEnabled={false}>
    <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} labelStyle={{fontSize:16}} itemsContainerStyle={{paddingVertical:0}} />
    </SafeAreaView>
  </ScrollView>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    MapScreen: {
      screen: MapScreen,
      navigationOptions: ({ navigation, screenProps }) => (
        {
        title:'地圖'
    })
    },
    ChatRoomStack: {
      screen: ChatroomNavigator,
      navigationOptions: ({ navigation, screenProps }) => (
        {
        title:'聊天室',
        
    })
    }
  },
  {
    initialRouteName: "MapScreen",
    drawerWidth: width/2,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

export default MyDrawerNavigator;
