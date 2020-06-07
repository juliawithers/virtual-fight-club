import React from 'react';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import AboutGame from './AboutGame'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`AboutGame component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <AboutGame/>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<AboutGame/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})