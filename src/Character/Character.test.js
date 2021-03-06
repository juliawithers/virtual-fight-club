import React from 'react';
import { configure } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Character from './Character';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Character />
            </BrowserRouter>
            ,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  