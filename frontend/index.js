/**
 * @format
 */

import { AppRegistry } from 'react-native';
import ChatRoom from './screens/chatRoomScreen';
import Map from './screens/mapScreen'
import { name as appName } from './app.json';


import ApolloWrapper from './ApolloWrapper'




AppRegistry.registerComponent(appName, () => ApolloWrapper(Map));
