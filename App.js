import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const headerText = 'Hello World!';
const imageURI =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvcR7jOw6QgU4xl7JJwTULxSZoFQ4Qj3GkDX01eQZ72ATmmO1K';

export default class App extends Component {
  state = {
    showInput: false,
    inputText: '',
    text: '',
    latitude: '33.8734',
    longitude: '115.9010'
  };

  toggleInput = () => {
    this.setState({ showInput: true });
  };

  handleOnChangeText = text => this.setState({ inputText: text });

  handleOnSubmit = event => {
    this.setState({ text: event.nativeEvent.text, inputText: '' });
  };

  render() {
    const { text, latitude, longitude, showInput, inputText } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={20}>
          {showInput ? (
            <View style={styles.contentContainer}>
              <Image source={{ uri: imageURI }} style={styles.image} />
              <Text>{this.state.text}</Text>
              <Text
                style={styles.coordinates}
              >{`(${latitude}, ${longitude})`}</Text>
            </View>
          ) : null}
          {showInput ? (
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.handleOnChangeText(text)}
              value={inputText}
              onSubmitEditing={event => this.handleOnSubmit(event)}
            />
          ) : (
            <Text style={styles.header} onPress={this.toggleInput}>
              {headerText}
            </Text>
          )}
        </KeyboardAvoidingView>
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
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    width: WIDTH * 0.75,
    borderWidth: 0.5,
    marginTop: 20
  },
  image: {
    width: WIDTH * 0.5,
    height: WIDTH * 0.5
  }
});
