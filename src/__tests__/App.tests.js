import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import App from "../App";

describe("App", () => {
  it("renders Hello World text on mount", () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("uses KeyboardAvoidingView component", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.childAt(0)).toEqual(wrapper.find("KeyboardAvoidingView"));
  });

  it("hides Hello World button after its been pressed and renders content", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    wrapper.setState({ text: "abc", latitude: "100.000", longitude: "-50.000" });
    instance.toggleInput();

    expect(wrapper).toMatchSnapshot();
  });

  describe("TextInput's onChangeText prop", () => {
    it('sets inputText state to inputted value', () => {
      const wrapper = shallow(<App />);

      wrapper.setState({ showInput: true });
      wrapper.find("TextInput").prop("onChangeText")("abc");

      expect(wrapper.state("inputText")).toEqual("abc");
    })
  })

  describe("TextInput's onSubmitEditing prop", () => {
    it('sets text state and resets inputText state to an empty string', () => {
      const wrapper = shallow(<App />);

      wrapper.setState({ showInput: true });

      const event = { nativeEvent: { text: "abc" } };
      wrapper.find("TextInput").prop("onSubmitEditing")(event);

      expect(wrapper.state("text")).toEqual("abc");
      expect(wrapper.state("inputText")).toEqual("");
    })
  });
});
