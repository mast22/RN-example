import * as React from 'react';
import { View, Text, Button } from 'react-native';


function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Страница о себе" onPress={() => navigation.navigate('About')} />
      <Button title="Галлерея" onPress={() => navigation.navigate('Gallery')} />
      <Button title="Контакты" onPress={() => navigation.navigate('Contacts')} />
      <Button title="Регистрация" onPress={() => navigation.navigate('Register')} />
      <Button title="Войти" onPress={() => navigation.navigate('Login')} />
      <Button title="Список пользователь" onPress={() => navigation.navigate('UserList')} />
    </View>
  );
}

export default Home;