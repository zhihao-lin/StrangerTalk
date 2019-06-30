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
import { Query, Mutation } from 'react-apollo'
import { GET_TOKEN } from '../graphql'
import Geolocation from "Geolocation";


let username = ''






export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            local:{
                longitude,
                latitude,
            },
            account: '',
            age:'', 
            password: '',
            description:'' };
        AsyncStorage.getItem('token').then((userToken) => {
            console.log(userToken)
            //if(userToken)
            //this.props.navigation.navigate('MyDrawerNavigator');
         })
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
                    }}>Name</Text>
                    <TextInput style={{ 
                          fontSize: 18,
                          border: 'solid',
                          borderBottomWidth: 1,
                          borderColor: '#878787',
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
                    }}>Age</Text>
                    <TextInput style={{
                        fontSize: 18,
                        border: 'solid',
                        borderBottomWidth: 1,
                        borderColor: '#878787',
                        width: 250, 
                        height: 40,
                        marginBottom:8
                     }} onChangeText={(text) => this.setState({ age: text })}
                        value={this.state.age}
                    />
                    <Text style={{
                        color: '#949494',
                        fontSize: 18,
                        marginBottom:8
                    }}>Password</Text>
                    <TextInput style={{ 
                        fontSize: 18,
                        border: 'solid',
                        borderBottomWidth: 1,
                        borderColor: '#878787',
                        width: 250, 
                        height: 40,
                        marginBottom:8
                     }} onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                    <Text style={{
                        color: '#949494',
                        fontSize: 18,
                        marginBottom:8
                    }}>Describe YourSelf</Text>
                    <TextInput style={{ 
                        fontSize: 18,
                        border: 'solid',
                        borderBottomWidth: 1,
                        borderColor: '#878787',
                        width: 250, 
                        height: 40,
                        marginBottom:8
                     }} onChangeText={(text) => this.setState({ description: text })}
                        value={this.state.description}
                    />
                </View>
                <Mutation
                    mutation={GET_TOKEN}
                >
                    {(createToken, { loading, error }) => {
                        if (error) {
                            Alert.alert('連線錯誤', '請檢查網路狀態', { text: '確認', onPress: () => { } });
                        }
                        return (
                            <TouchableOpacity
                                style={{marginTop:10,width:80,height:35,backgroundColor:'#ff9317', borderRadius: 15,alignItems:'center',justifyContent:'center'                          }}
                                title={'產生新的連線代碼'}
                                onPress={() => {
                                    createToken({ variables: { name: this.state.account, password:this.state.password } }).then(({ data }) => {
                                        console.log(data)
                                        console.log(data.login.token)
                                        console.log(data.login.id)
                                        console.log(data.login.name)
                                        AsyncStorage.setItem( "token", data.login.token);
                                        AsyncStorage.setItem( "id", data.login.id);
                                        AsyncStorage.setItem( "name", data.login.name);
                                    });
                                }}
                                narrow={true}
                                marginTop={28}
                            ><Text style={{color:'white'}}>註冊</Text></TouchableOpacity>
                        )
                    }}
                </Mutation>
            </SafeAreaView>
        );
    }
}
