import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity
} from "react-native";

let username = ''

export default class chatRoomItem extends React.Component {
    state = {
        messages: []
    };

    componentDidMount(){
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('name');
          if (value !== null) {
            // We have data!!
            username = value
            console.log(username);
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    render() {
        const opponent = this.props.data.names.map( item => {
            if(item === username){
                return;
            }
            else return item
        })
        console.log(opponent)
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', backgroundColor: 'grey', height: 100, alignItems: 'stretch' }}
                onPress={() => { this.props.navigation.push('ChatRoomDetail',{
                        data : this.props.data
                }) }}
            >
            <Text></Text>
            {console.log(this.props.data.names)}
            </TouchableOpacity>
        );
    }
}
