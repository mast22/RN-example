import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import About from './src/About';
import Gallery from './src/Gallery';
import Contacts from './src/Contacts';
import Home from './src/Home';
import ImageUpload from './src/ImageUpload';
import Register from './src/Register';
import Login from './src/Login';
import UserList from './src/UserList';
import UserDetail from './src/UserDetail';

const AppState = {
  token: null,
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="ImageUpload" component={ImageUpload} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

