import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert
} from "react-native";
import { Query, Mutation } from "react-apollo";
import { GET_TOKEN } from "../graphql";

let username = "";

export default class loginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: "", password: "" };
    AsyncStorage.getItem("token").then(userToken => {
      console.log(userToken);
      if (userToken) this.props.navigation.navigate("MyDrawerNavigator");
    });
  }
    
    
    render() {

        return (
            <SafeAreaView
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <View>
                    <Text style={{
                          color: '#ff9317',
                          fontSize:40,
                          marginBottom:50,
                          fontFamily: 'Arial Rounded MT Bold',
                          textAlign:'center'

                    }}>StrangerTalk</Text>
                    <Text style={{
                          color: '#949494',
                          fontSize: 18,
                          marginBottom:8
                    }}>帳號</Text>
                    <TextInput style={{ 
                          paddingHorizontal: 10,
                          fontSize:20,
                          fontFamily: 'Arial',
                          borderRadius: 26.5,
                          border: 'solid',
                          borderWidth: 1,
                          borderColor: '#878787',
                          backgroundColor: '#f9f9f9',
                          width: 250, 
                          height: 40,
                          marginBottom:8
                        }} onChangeText={(text) => this.setState({ account: text })}
                        value={this.state.account}
                    />
                    <Text style={{
                        color: '#949494',
                        fontSize: 18,
                        marginBottom:8
                    }}>密碼</Text>
                    <TextInput style={{ 
                        paddingHorizontal: 10,
                        fontSize:20,
                        fontFamily: 'Arial',
                        borderRadius: 26.5,
                        border: 'solid',
                        borderWidth: 1,
                        borderColor: '#878787',
                        backgroundColor: '#f9f9f9',
                        width: 250,
                        height: 40,
                        marginBottom:8
                     }} onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </View>
                <Mutation
                    mutation={GET_TOKEN}
                >
                  <Text style={{ color: "white" }}>註冊</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    margin: 10,
                    width: 80,
                    height: 35,
                    backgroundColor: "#ff9317",
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  title={"產生新的連線代碼"}
                  onPress={() => {
                    createToken({
                      variables: {
                        name: this.state.account,
                        password: this.state.password
                      }
                    }).then(({ data }) => {
                      console.log(data);
                      console.log(data.login.token);
                      console.log(data.login.id);
                      console.log(data.login.name);
                      AsyncStorage.setItem("token", data.login.token);
                      AsyncStorage.setItem("id", data.login.id);
                      AsyncStorage.setItem("name", data.login.name);
                      this.props.navigation.push("MyDrawerNavigator");
                    });
                  }}
                  narrow={true}
                  marginTop={28}
                >
                  <Text style={{ color: "white" }}>登入</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Mutation>
      </SafeAreaView>
    );
  }
}
