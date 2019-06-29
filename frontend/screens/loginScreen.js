import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";

let username = ''

export default class loginScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = { account:'',password: '' };
      }
    render() {
       
        return (
            <SafeAreaView
                style={{ flex: 1,alignItems:'center', justifyContent:'center' }}
            >
            <View>
            <Text>帳號</Text>
            <TextInput style={{width:100,height:40,borderWidth:1}}         onChangeText={(text) => this.setState({account:text})}
        value={this.state.account}
        />
            <Text>密碼</Text>
            <TextInput style={{width:100,height:40,borderWidth:1}}         onChangeText={(text) => this.setState({password:text})}
        value={this.state.password}
        />            
        </View>
            <TouchableOpacity><Text>登入</Text></TouchableOpacity>
            </SafeAreaView>
        );
    }
}
