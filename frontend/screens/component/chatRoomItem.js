import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity
} from "react-native";
export default class chatRoomItem extends React.Component {
    state = {
        messages: []
    };

    render() {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', backgroundColor: 'grey', height: 100, alignItems: 'stretch' }}
                onPress={() => { this.props.navigation.push('ChatRoomDetail') }}
            >

            </TouchableOpacity>
        );
    }
}
