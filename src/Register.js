import * as React from 'react';
import {
  View, Text, Button,
  TextInput,
} from 'react-native';
import { useFormik } from 'formik';
import axios from 'axios';
import AppState from '../App';


function Register({ navigation }) {
  if (AppState.token != null) {
    alert('Вы уже вошли');
    navigation.navigate('Home');
  }

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    onSubmit: values => {
      axios.post('http://studentapi.myknitu.ru/register/', values).then(function (response) {
        if (response.data == 'error') {
          alert('Такой пользователь уже существует');
        } else {
          alert('Вы успешно зарегестрировались и авторизовались');
          AppState.token = response.data.token;
          navigation.navigate('About');
        }
      })
    },
  });
  return (
    <View>
      <Text>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="login">Логин</label>
          <input
            style={{ margin: 10, padding: 10 }}
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <label htmlFor="password">Пароль</label>
          <input
            style={{ margin: 10, padding: 10 }}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </Text>
    </View>
  );
}

export default Register;
