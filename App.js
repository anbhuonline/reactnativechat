import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import AddChatScreen from './screens/AddChat';
import ChatScreen from './screens/Chat';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle : {backgroundColor:"#c43b69"},
  headerTitleStyle:{textAlign:'center', flex:1, color:"white"},
  headerTintColor:"white"
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}> */}
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddChat" component={AddChatScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
