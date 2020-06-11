import React from 'react';
import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import CharacterDescription from './CharacterDescription';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <CharacterDescription />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  