import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';


class ImageUpload extends React.Component {
  state = {
    image: null,
  };

  selectImage = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true
      }, (response) => {
        let bodyFormData = new FormData();
        bodyFormData.append('image', response.base64);
        axios({
          method: 'post',
          url: 'http://studentapi.myknitu.ru/send/',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
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


export default ImageUpload;
