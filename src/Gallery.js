import * as React from 'react';
import axios from 'axios';
import { View, Text, Button, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';


const imageStyles = {
  width: 300,
  height: 300,
  margin: 10,
}


class Gallery extends React.Component {
  state = {
    photos: [],
  }

  componentDidMount() {
    axios.get('http://studentapi.myknitu.ru/')
      .then(res => {
        this.setState({ photos: res.data['images'] })
      })
  }

  renderItem({ item }) {
    return <Image key={Math.random().toString()} source={{ uri: item.img }} style={imageStyles} />
  };

  flatListRenderer() {
    if (this.state.photos.length == 0) {
      return <Text>Загрузка</Text>
    } else {
      return <FlatList
        data={this.state.photos}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    }
  }


  render() {
    return (
      <View>
        <Button title="Загрузить фото" onPress={() => this.props.navigation.navigate('ImageUpload')} />
        {this.flatListRenderer()}
      </View>
    )
  };
}

export default Gallery;