import React from 'react';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import CreateAccount from './CreateAccount'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`CreateAccount component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <CreateAccount/>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<CreateAccount/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})