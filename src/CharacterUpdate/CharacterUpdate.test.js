import React from 'react';
import { configure } from 'enzyme'
import ReactDOM from 'react-dom';
import CharacterUpdate from './CharacterUpdate'
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <CharacterUpdate />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})