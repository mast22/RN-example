import * as React from 'react';
import axios from 'axios';
import { View, Text, Button, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import AppState from '../App';


class Chat extends React.Component {
  state = {
    dialog: [],
  }

  componentDidMount() {
    
  }

  renderItem({ item }) {
    return <Text>{item.message} В: {item.datetime}</Text>
  };

  flatListRenderer() {
    if (this.state.dialog.length == 0) {
      return <Text>Загрузка</Text>
    } else {
      return <FlatList
        data={this.state.dialog}
        renderItem={this.renderItem}
        keyExtractor={item => Math.random().toString()}
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

export default Chat;