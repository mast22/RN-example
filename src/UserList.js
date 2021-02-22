import * as React from 'react';
import axios from 'axios';
import { View, Text, Button, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import AppState from '../App';



class UserList extends React.Component {
  state = {
    users: [],
  }

  componentDidMount() {
    if (AppState.token == null) {
      alert('Войдите или зарегистрируйтесь');
      this.props.navigation.navigate('Home');
    } else {
      axios.post('http://studentapi.myknitu.ru/listusers/', { 'token': AppState.token })
        .then(res => {
          let users = [];
          for (let user of res.data['users']) {
            let newUser = user;
            newUser['nav'] = this.props.navigation;
            users.push(newUser)
          }
          this.setState({ users: users })
        })
    }
  }

  renderItem({ item, index }) {
    return <Button
      title={`${index}: Фамилия: ${item.family} Имя: ${item.nameuser}`}
      onPress={() => { item.nav.navigate('UserDetail', { userId: item.id }) }}
      style={{ maring: 10 }}
    />
  };

  flatListRenderer() {
    if (this.state.users.length == 0) {
      return <Text>Загрузка</Text>
    } else {
      return <FlatList
        data={this.state.users}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    }
  }


  render() {
    return (
      <View>
        {this.flatListRenderer()}
      </View>
    )
  };
}

export default UserList;