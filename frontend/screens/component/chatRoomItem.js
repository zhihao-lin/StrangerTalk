import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

let username = ''

export default class chatRoomItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: ''
        };
        AsyncStorage.getItem('name').then((name) => {
            console.log(name)
            this.setState({ username: name })
        })
    }




    render() {
        const opponent = this.props.data.names.map(item => {
            console.log(item)
            console.log(this.state.username)
            if (item === this.state.username) {
                return;
            }
            else return item
        })
        console.log(opponent)
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', height: 80, alignItems: 'stretch' }}
                onPress={() => {
                    this.props.navigation.push('ChatRoomDetail', {
                        data: this.props.data
                    })
                }}
            >
                <View style={{ flex: 1, flexDirection:'row',alignItems: 'center', justifyContent: 'flex-start',paddingLeft:15}}>
                    <View style={{ borderRadius:30,width: 50, height: 50, backgroundColor: 'grey' }}></View>

                    <Text style={{
                        marginLeft:30,
                        fontSize: 20,

                    }}>{opponent}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}
