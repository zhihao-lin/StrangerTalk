import { DrawerItems, createDrawerNavigator, createAppContainer } from "react-navigation";
import MapScreen from "../screens/mapScreen";
import ChatroomNavigator from './ChatroomNavigation'
import React from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import {Text,ScrollView,SafeAreaView,Dimensions,AsyncStorage,View} from 'react-native'

const {width ,height}=Dimensions.get('window')

const CustomDrawerContentComponent = props => (
  <ScrollView scrollEnabled={false}>
    <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} labelStyle={{fontSize:16}} itemsContainerStyle={{paddingVertical:0}} />
      <View style={{marginTop:500}}>
      <TouchableOpacity style={{marginHorizontal:40,borderColor:'#BD2300',borderWidth:1,borderRadius:10,padding:10}} onPress={()=>{
        AsyncStorage.setItem('token','')
        props.navigation.pop()
        }}><Text style={{fontSize:15,textAlign:'center',color:'#BD2300'}}>Log out</Text></TouchableOpacity>
      </View>     
    </SafeAreaView>
  </ScrollView>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    MapScreen: {
      screen: MapScreen,
      navigationOptions: ({ navigation, screenProps }) => (
        {
        title:'Map'
    })
    },
    ChatRoomStack: {
      screen: ChatroomNavigator,
      navigationOptions: ({ navigation, screenProps }) => (
        {
        title:'ChatRoom',
        
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
