import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.navigator = {
  geolocation: {
    clearWatch: jest.fn(),
    getCurrentPosition: jest.fn((success, failure, options) => {
      success({
        coords: {
          longitude: 60,
          latitude: 60,
        },
      });
    }),
    stopObserving: jest.fn(),
    watchPosition: jest.fn(),
  },
};

Enzyme.configure({ adapter: new Adapter() });
