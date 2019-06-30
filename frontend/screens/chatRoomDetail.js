
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { GET_CHAT_ROOMS } from '../graphql'
import { Query, Mutation } from 'react-apollo'
import { AsyncStorage,Alert } from 'react-native'
import { SEND_MESSAGE } from '../graphql'
import { makeEmptyAggregatedTestResult } from '@jest/test-result';

let username = ''
let opponentname = ''

export default class chatRoomDetail extends React.Component {
  constructor(props) {
    super(props);
    this._setData = this._setData.bind(this)
    this._deleteData = this._deleteData.bind(this)
    this.state = {
      messages: [],
    };
    AsyncStorage.getItem("name").then(name => {
      username = name
    });

  }

  _deleteData(){
    this.setState({
      messages: [],
    })
  }

  componentDidMount(){
    console.log(this.props)
  }

  componentWillMount() {
    opponentname = this.props.navigation.getParam('username')
    if(this.props.navigation.getParam('data')){
      this._setData(this.props.navigation.getParam('data'))
    }
  }

  _setData(data) {
    const messages = []
    console.log(data.names)
    data.names.map((name)=>{
      if(name !== username)
      opponentname = name
      console.log(opponentname)
    })
    if (data === '') return;
    for (i = data.messages.length - 1; i >= 0; i--) {
      const userId = 0;
      console.log(data.from[i])
      console.log(username)
      if (data.from[i] === username) {
        userId = 2
      }
      else {
        userId = 1
      }
      const message = {
        _id: i,
        text: data.messages[i],
        createAt: new Date(),
        user: {
          _id: userId,
          name: data.from[i]
        }
      }
      messages.push(message)
    }
    this.setState(({ messages: messages }))
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    
  }

  render() {
    return (
      <Mutation
        mutation={SEND_MESSAGE}
      >
        {(sendmessage, { loading, error }) => {
          if (error){
            Alert.alert('Too far', 'Cannot Send Message', { text: '確認', onPress: () => { } });
          }
          return (
            <GiftedChat
              messages={this.state.messages}
              onSend={(messages) => {
                sendmessage({ variables: { from: username, to: opponentname, message: messages[0].text } }).then(({ data }) => {
                  console.log(data)
                  this._setData(data.sendMessage)
                });
              }}
              user={{
                _id: 2,
                name: username,
              }}
            />
          )
        }}
      </Mutation>

    )
  }
}