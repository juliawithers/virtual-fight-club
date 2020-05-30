import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<App/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})