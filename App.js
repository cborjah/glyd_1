import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Share,
  Alert
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
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    const geoOptions = {
      timeout: 20000,
      maximumAge: 0,
      enableHighAccuracy: true
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(
          'Successfully retrieved coordinates:',
          `latitude: ${latitude}, longitude: ${longitude}`
        );
        this.setState({
          latitude: latitude.toFixed(3),
          longitude: longitude.toFixed(3)
        });
      },
      err => {
        console.log('Error retrieving location: ', err);
        Alert.alert(
          'Error',
          'Unable to retrieve your location. Please check your connection and permissions.'
        );
      },
      geoOptions
    );
  }

  toggleInput = () => {
    this.setState({ showInput: true });
  };

  handleOnChangeText = text => this.setState({ inputText: text });

  handleOnSubmit = event => {
    this.setState({ text: event.nativeEvent.text.trim(), inputText: '' });
  };

  handleShare = () => {
    const content = { url: imageURI };
    const options = {
      // For Email
      subject: 'Check out this pic!'
    };

    Share.share(content, options);
  };

  renderImage = () => {
    return (
      <TouchableOpacity onPress={this.handleShare}>
        <Image source={{ uri: imageURI }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  renderCoordinates = () => {
    const { latitude, longitude, text } = this.state;

    if (!!text.length && latitude && longitude) {
      return (
        <Text style={styles.coordinates}>{`(${latitude}, ${longitude})`}</Text>
      );
    }
  };

  render() {
    const { text, showInput, inputText } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={20}>
          {showInput ? (
            <View style={styles.contentContainer}>
              {this.renderImage()}
              <Text>{this.state.text}</Text>
              {this.renderCoordinates()}
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
