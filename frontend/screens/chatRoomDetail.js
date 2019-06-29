
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { GET_CHAT_ROOM_DETAIL } from '../graphql'
import { Query } from 'react-apollo'
import { AsyncStorage } from 'react-native'

export default class chatRoomDetail extends React.Component {
  constructor(props) {
    super(props);
    this._setData = this._setData.bind(this)
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
          },
        },
        {
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React ',
          },
        }
      ],
    })
  }

  _setData(data) {
    const messages = data.messages.map(()=>{})
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    _setData(this.props.navigation.getParam('data')) 
    console.log(this.props.navigation.getParam('data'))
    console.log(this.state.messages)
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