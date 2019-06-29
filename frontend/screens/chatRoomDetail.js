
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { GET_CHAT_ROOM_DETAIL } from '../graphql'
import { Query } from 'react-apollo'
import { AsyncStorage } from 'react-native'

let username = ''

export default class chatRoomDetail extends React.Component {
  constructor(props) {
    super(props);
    this._setData = this._setData.bind(this)
    this.state = {
      messages: [],
    };
    
  }

  componentWillMount() {
    this._retrieveData()
    this._setData(this.props.navigation.getParam('data'))
  }

  _setData(data) {
    const messages=[]
    if(data === '') return;
    for (i = data.messages.length-1; i >=0; i--) { 
      const userId=0;
      console.log(data.from[i])
      console.log(username)
      if(data.from[i] === username){
        userId = 2
      }
      else{
        userId = 1
      }
      const message={
        _id: i,
        text: data.messages[i],
        createAt : new Date(),
        user:{
          _id: userId,
          name: data.from[i]
        }
      }
      messages.push(message)
      console.log(message)
    }  
    this.setState( ({messages: messages}))
  }

  _retrieveData = async () => {
    try {
      const Asyncname = await AsyncStorage.getItem('name');
      if (Asyncname !== null) {
        // We have data!!
        username = Asyncname
        console.log(username);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 2,
          name: "James",
        }}
      />
    )
  }
}