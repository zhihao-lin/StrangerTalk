import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity
} from "react-native";
import React, { Component } from "react";
import MapView from "react-native-maps";
import Geolocation from "Geolocation";
import { Query } from "react-apollo";
import { GET_USER_LOCATION } from "../graphql";
import { Marker, Callout, CalloutSubview } from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";
import { Image } from 'react-native'
import { AsyncStorage } from 'react-native'
import { GET_CHAT_ROOMS } from '../graphql'


export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: {
        longitude: 0,
        latitude: 0
      },
      username:''
    };
    AsyncStorage.getItem('name').then((name) => {
      console.log(name)
      this.setState({username:name})
   })
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    Geolocation.getCurrentPosition(
      location => {
        this.setState({
          local: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
          }
        });
        var result =
          "\n經度：" +
          location.coords.longitude +
          "\n緯度：" +
          location.coords.latitude;
      },
      error => {
        alert("獲取位置失败：" + error);
      }
    );
  }

  renderMarker(users,friends) {
    const addMarker = users.map(user => {
      let isFriendBool = false
      console.log(user)
      console.log(friends)
      for( i = 0; i < friends.length ; i++){
        console.log(user.name)
        console.log(friends[i].name)
        if(user.name === friends[i].name){
          isFriendBool = true
          break
        }
        else{
          isFriendBool = false
        }
      }
      console.log(isFriendBool)

      return (
        <Query query={GET_CHAT_ROOMS} fetchPolicy={"network-only"}
          variables={{ name: this.state.username }}>
          {({ loading, error, data }) => {
            if(loading) return (null)
            const messages = data.chatRooms.find((item)=>{
              if(item.names[0]===user.name || item.names[1]===user.name){
                return item
              }
            })
            return (
              <Marker
                coordinate={{
                  latitude: user.latitude,
                  longitude: user.longitude
                }}
                pinColor={isFriendBool?'red':'blue'}
              >
                <Callout>
                  
                  <View style={{ flex:1,padding:10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'Arial'}}>Name: {user.name}</Text>
                    <Text>Self Introduction: </Text>
                    <Text>{user.description}</Text>
                  </View>
                  <CalloutSubview style={{ flex: 1 }} onPress={() => {
                    console.log(this.props.navigation)
                    this.props.navigation.navigate('ChatRoomDetail',{
                      data : messages?messages:'' })
                   }}>
                    <TouchableOpacity style={{
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'red'
                    }} ref={button => this.button = button}>
                      <Text style={{ marginVertical: 5, fontFamily: 'Arial', color: 'white' }}>傳送訊息</Text>
                    </TouchableOpacity>
                  </CalloutSubview>
                </Callout>
              </Marker>
            );
          }}
        </Query>

      );
    });
    console.log(addMarker);
    return addMarker;
  }

  render() {
    return (
      <Query query={GET_USER_LOCATION} fetchPolicy={"network-only"} variables={{name:this.state.username}}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error! ${error.message}`;
          console.log(data.user.friends)
          const marker = this.renderMarker(data.user.neighbors,data.user.friends);
          return (
            <SafeAreaView style={styles.container}>

              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.local.latitude,
                  longitude: this.state.local.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
                }}

              >
                <Marker
                  pinColor={"green"}
                  coordinate={{
                    latitude: this.state.local.latitude,
                    longitude: this.state.local.longitude
                  }}
                >
                </Marker>
                {marker}
              </MapView>

            </SafeAreaView>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  map: {
    flex: 1,
    width: 500
  },
  button: {
    marginTop: 50,
    width: 100,
    height: 35,
    backgroundColor: "#00AD65",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00AD65",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: "Helvetica",
    fontSize: 15,
    color: "#FFFFFF",
    letterSpacing: -0.24,
    textAlign: "center",
    lineHeight: 20
  },

});
