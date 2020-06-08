import React from 'react';
import { configure } from 'enzyme'
import ReactDOM from 'react-dom';
import Character from './Character'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Character />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  