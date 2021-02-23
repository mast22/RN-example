import axios from 'axios';
import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import AppState from '../App';

let getUserUrl = 'http://studentapi.myknitu.ru/getuser/';

class About extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    if (AppState.token == null) {
      alert('Войдите или зарегистрируйтесь');
      this.props.navigation.navigate('Home');
    } else {
      axios.post(getUserUrl, { 'token': AppState.token }).then(resp => {
        this.setState({ user: resp.data });
      })
    }
  }

  renderUser() {
    if (this.state.user === null) {
      return <Text>Загрузка</Text>
    } else {
      return <Text>
        <p>Логин {this.state.user.login}</p>
        <p>Id {this.state.user.id_user}</p>
        <p>Фамилия {this.state.user.family}</p>
        <p>Имя {this.state.user.name}</p>
        <p>Номер телефона {this.state.user.phonenumber}</p>
        <p>Дата рождения {this.state.user.birthday}</p>
        <p>Вк {this.state.user.vk}</p>
        <p>Скайп {this.state.user.skype}</p>
        Фото <Image source={{ uri: this.state.user.img }} style={{ width: 100, height: 100 }} />
        <Button title="Редактировать профиль" onPress={() => {this.props.navigation.navigate('EditAbout')}}/>
        <Button title="Изменить фото" onPress={() => {this.props.navigation.navigate('NewPhoto')}} />
      </Text>
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.renderUser()}
      </View >
    );
  }
}

export default About;