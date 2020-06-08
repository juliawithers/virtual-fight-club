import React from 'react';
import { configure } from 'enzyme'
import ReactDOM from 'react-dom';
import CharacterCreate from './CharacterCreate'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <CharacterCreate />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  