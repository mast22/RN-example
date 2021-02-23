import axios from 'axios';
import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, Button, Image, TextInput, FlatList } from 'react-native';
import AppState from '../App';
import { Formik, Form, Field, ErrorMessage } from 'formik';

let getUserUrl = 'http://studentapi.myknitu.ru/getuserwithid/';
let getCharUrl = 'http://studentapi.myknitu.ru/getdialog/'


class UserDetail extends React.Component {
  state = {
    user: null,
    messages: [],
  }

  componentDidMount() {
    let payload = {
      'token': AppState.token,
      'userid': this.props.route.params.userId,
    }

    axios.post(getUserUrl, payload)
      .then(
        resp => { this.setState({ user: resp.data });}
      )
    
    axios.post(getCharUrl, {token: AppState.token, userto: this.props.route.params.userId,})
      .then(res => {
        this.setState({ messages: res.data['messages'] })
      })
  }

  flatListRenderer() {
    if (this.state.messages.length == 0) {
      return <Text>Сообщений нет</Text>
    } else {
      return <FlatList
        data={this.state.messages}
        renderItem={this.renderItem}
        keyExtractor={item => Math.random().toString()}
      />
    }
  }

  renderItem({ item }) {
    return <Text>{item.message} В: {item.datetime}</Text>
  };

  sendMessage(text) {
    let sendMessageUrl = 'http://studentapi.myknitu.ru/sendmessage/';
    let message = {
      message: text['msg'],
      token: AppState.token,
      userto: this.props.route.params.userId
    }

    axios.post(sendMessageUrl, message).then(response => {
      this.props.navigation.push("UserDetail", { userId: this.props.route.params.userId });
    })
  }

  render() {
    if (this.state.user == null) {
      return <Text>Загрузка</Text>
    }
    return <div>
      <Text>
        Фамилия: {this.state.user.family || "Отсутствует"}
        Имя: {this.state.user.name || "Отсутствует"}
        Фото: <Image source={{ uri: this.state.user.img }} style={{ height: 100, width: 100 }} />
      </Text>

      <Formik
        initialValues={{msg: ""}}
        onSubmit={(values, { setSubmitting }) => {console.log('132'); this.sendMessage(values);}}
      >
        <Form>
        <Field type="text" name="msg" placeholder="Сообщение" />
             <button type="submit">
               Отправить сообщение
             </button>
         </Form>
     </Formik>
       {this.flatListRenderer()}
    </div>
  }
}

export default UserDetail;