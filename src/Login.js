import * as React from 'react';
import {
  View, Text, Button,
  TextInput,
} from 'react-native';
import { useFormik } from 'formik';
import axios from 'axios';
import AppState from '../App';
import { Formik, Form, Field, ErrorMessage } from 'formik';


class Login extends React.Component {
  render() {
    if (AppState.token != null) {
      alert('Вы уже вошли');
      this.props.navigation.navigate('Home');
    }
    return (
      <View>
        <Text>
          <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios.post('http://studentapi.myknitu.ru/auth/', values).then(response => {
              if (response.data == 'error') {
                alert('Проблема с входом в систему');
              } else {
                alert('Вы успешно авторизовались');
                AppState.token = response.data.token;
                this.props.navigation.navigate('About');
              }
            })
          }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Field type="text" name="login" placeholder="Логин" />
              <Field type="text" name="password" placeholder="Пароль" />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
            )}
          </Formik>
          </Text>
      </View>
    );
  }
}

export default Login;
