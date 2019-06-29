/**
 * @format
 */

import { AppRegistry } from 'react-native';
import ChatRoom from './screens/chatRoomDetail';
import Map from './screens/mapScreen'
import { name as appName } from './app.json';
import mainScreenNavigation from './navigation/mainScreenNavigation'
import ApolloWrapper from './ApolloWrapper'
import loginScreen from './screens/loginScreen'




AppRegistry.registerComponent(appName, () => ApolloWrapper(mainScreenNavigation));
