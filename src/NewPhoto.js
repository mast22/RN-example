import * as React from 'react';
import { View, Text, Button, AppState } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';


class NewPhoto extends React.Component {
  state = {
    image: null,
  };

  selectImage = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true
      }, (response) => {
        let json = {
          token: AppState.token,
          img: response.base64,
        }
        axios.post('http://studentapi.myknitu.ru/updateuserimage/', json)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    )
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Загрузите изображение</Text>
        <Button onPress={this.selectImage} title="Выбрать изображение" />
      </View >
    );
  }
}


export default NewPhoto;
