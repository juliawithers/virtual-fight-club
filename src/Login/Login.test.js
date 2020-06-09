import React from 'react';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import Login from './Login'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Login />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected', () => {
        const wrapper = shallow(<Login />)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})