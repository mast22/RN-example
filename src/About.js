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
        console.log(resp.data);
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
        Фото <Image source={{ uri: this.state.user.img }} style={{ width: 100, height: 100 }} />
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