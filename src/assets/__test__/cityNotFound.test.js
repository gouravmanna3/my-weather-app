import React from 'react';
import { shallow } from 'enzyme';
import CityNotFound from '../../features/weather/cityNotFound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toJson from 'enzyme-to-json';


describe("should render cityNotFound component", () => {
  it("it renders correctly", () => {
    shallow(<CityNotFound />);
  });

  it("should create a snapshot correctly", () => {
    const component = shallow(<CityNotFound />);
    expect(toJson(component)).toMatchSnapshot();
  })

  it("should render elements correctly", () => {
    const component = shallow(<CityNotFound />);
    expect(component.hasClass('errorContainer')).toBe(true);
    expect(component.find(FontAwesomeIcon).hasClass('searchIcon')).toBe(true);
    expect(component.find('h2').text()).toEqual('city not found');
  })

})
