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
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: 43.3,
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Arial",
            color: "#ff9317"
          }}
        >
          Stranger Talk
        </Text>
        <View>
          <Text style={{ margin: 2, color: "#949494", font: "Arial" }}>
            帳號
          </Text>
          <TextInput
            style={{
              width: 200,
              height: 30,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: "#949494",
              backgroundColor: "#f9f9f9",
              margin: 2
            }}
            onChangeText={text => this.setState({ account: text })}
            value={this.state.account}
          />
          <Text style={{ margin: 2, color: "#949494", font: "Arial" }}>
            密碼
          </Text>
          <TextInput
            style={{
              width: 200,
              height: 30,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: "#949494",
              backgroundColor: "#f9f9f9",
              margin: 2
            }}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
        </View>
        <Mutation mutation={GET_TOKEN}>
          {(createToken, { loading, error }) => {
            if (error) {
              Alert.alert("連線錯誤", "請檢查網路狀態", {
                text: "確認",
                onPress: () => {}
              });
            }
            return (
              <TouchableOpacity
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
                  });
                }}
                narrow={true}
                marginTop={28}
              >
                <Text style={{ marginTop: 4, color: "#949494", font: "Arial" }}>
                  登入
                </Text>
              </TouchableOpacity>
            );
          }}
        </Mutation>
      </SafeAreaView>
    );
  }
}
