import React, { Component } from "react";
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
} from "react-native";

const WIDTH = Dimensions.get("window").width;

const headerText = "Hello World!";
const imageURI =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvcR7jOw6QgU4xl7JJwTULxSZoFQ4Qj3GkDX01eQZ72ATmmO1K";

export default class App extends Component {
  state = {
    showInput: false,
    inputText: "",
    text: "",
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    this.fetchCurrentPosition();
  }

  fetchCurrentPosition = () => {
    const geoOptions = {
      timeout: 0,
      maximumAge: 0,
      enableHighAccuracy: true
    };

    // navigator.geolocation is global, no import required
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(
          "Successfully retrieved coordinates:",
          `latitude: ${latitude}, longitude: ${longitude}`
        );
        this.setState({
          latitude: latitude.toFixed(3),
          longitude: longitude.toFixed(3)
        });
      },
      err => {
        console.log("Error retrieving location: ", err);
        Alert.alert(
          "Error",
          "Unable to retrieve your location. Please check connection and permissions."
        );
      },
      geoOptions
    );
  };

  toggleInput = () => {
    this.setState({ showInput: true });
  };

  handleOnChangeText = text => this.setState({ inputText: text });

  handleOnSubmit = event => {
    const { latitude, longitude } = this.state;

    // Retry fetching current position if needed
    if (!latitude || !longitude) {
      this.fetchCurrentPosition();
    }

    this.setState({ text: event.nativeEvent.text.trim(), inputText: "" });
  };

  handleShare = () => {
    const content = { url: imageURI };
    const options = {
      // For Email
      subject: "Check out this pic!"
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
      <View style={[styles.container, styles.center]}>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.center}
          keyboardVerticalOffset={20}
        >
          {showInput ? (
            <View style={styles.center}>
              {this.renderImage()}
              <Text style={styles.text}>{text}</Text>
              {this.renderCoordinates()}
            </View>
          ) : null}
          {showInput ? (
            <TextInput
              style={styles.textInput}
              maxLength={100}
              onChangeText={val => this.handleOnChangeText(val)}
              value={inputText}
              onSubmitEditing={event => this.handleOnSubmit(event)}
            />
          ) : (
            <TouchableOpacity onPress={this.toggleInput}>
              <Text style={styles.header}>{headerText}</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 50,
    textAlign: "center"
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    flexWrap: "wrap"
  },
  textInput: {
    width: WIDTH * 0.75,
    borderWidth: 0.5,
    marginTop: 15,
    alignSelf: "center"
  },
  image: {
    width: WIDTH * 0.65,
    height: WIDTH * 0.65
  }
});
