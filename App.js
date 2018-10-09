import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image
} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const headerText = 'Hello World!';

export default class App extends Component {
  state = { showInput: false, text: '', latitude: '33.8734', longitude: '115.9010' };

  handleOnSubmit = async event => {
    this.setState({ text: event.nativeEvent.text });
  };

  render() {
    const { text, latitude, longitude } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvcR7jOw6QgU4xl7JJwTULxSZoFQ4Qj3GkDX01eQZ72ATmmO1K'
          }}
          style={styles.image}
        />
        <Text style={styles.header}>{headerText}</Text>
        <Text style={styles.coordinates}>{`(${latitude}, ${longitude})`}</Text>
        <Text>{text}</Text>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={event => this.handleOnSubmit(event)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    width: WIDTH * 0.75,
    borderWidth: 0.5
  },
  image: {
    width: WIDTH * 0.5,
    height: WIDTH * 0.5
  }
});
