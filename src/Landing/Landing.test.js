import React from 'react';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import Landing from './Landing'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`Landing component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Landing/>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<Landing/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})