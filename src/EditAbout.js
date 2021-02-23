import * as React from 'react';
import {
  View, Text, Button,
  TextInput,
} from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import AppState from '../App';

let getUserUrl = 'http://studentapi.myknitu.ru/getuser/';

class EditAbout extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    axios.post(getUserUrl, {token: AppState.token}).then(response => {
      this.setState({ user: response.data })
    })
  }

  render() {
    return (
    <View>
      <Formik
        initialValues={{
          "nameuser": this.state.user?.user,
          "family": this.state.user?.family,
          "birthday": this.state.user?.birthday,
          "phonenumber": this.state.user?.phonenumber,
          "vk": this.state.user?.vk,
          "skype": this.state.user?.skype,
        }}
        onSubmit={(values, { setSubmitting }) => {
          let userUpdate = 'http://studentapi.myknitu.ru/userupdate/';
          let valuesWithToken = values;
          valuesWithToken['token'] = AppState.token;

          axios.post(userUpdate, valuesWithToken).then(response => {
            alert("Данные были обновленны")
            this.props.navigation.navigate("About");
          })

        }}
      >
          <Form>
            <Field type="text" name="nameuser" placeholder="Имя" />
            <Field type="text" name="family" placeholder="Фамилия" />
            <Field type="text" name="birthday" placeholder="День рождения" />
            <Field type="text" name="phonenumber" placeholder="Номер телефона" />
            <Field type="text" name="vk" placeholder="Вк" />
            <Field type="text" name="skype" placeholder="Скайп" />

            <button type="submit">
              Обновить
            </button>
          </Form>
      </Formik>
     </View>
    )
  }
}

export default EditAbout;
