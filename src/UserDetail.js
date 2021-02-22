import axios from 'axios';
import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, Button, Image, TextInput } from 'react-native';
import AppState from '../App';

let getUserUrl = 'http://studentapi.myknitu.ru/getuserwithid/';

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function requestUser(userId) {
  return
}


class UserDetail extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    let payload = {
      'token': AppState.token,
      'userid': this.props.route.params.userId,
    }

    axios.post(getUserUrl, payload)
      .then(
        resp => { this.setState({ user: resp.data }); console.log(resp.data); }
      )
  }

  render() {
    if (this.state.user == null) {
      return <Text>Загрузка</Text>
    }
    return <Text>
      Фамилия: {this.state.user.family || "Отсутствует"}
      Имя: {this.state.user.name || "Отсутствует"}
      Фото: <Image source={{ uri: this.state.user.img }} style={{ height: 100, width: 100 }} />
    </Text >
  }
}

export default UserDetail;