import React from 'react';
import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import FightProfile from './FightProfile';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe(`Login component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const characterObject = {
            auth: "0810bd3e-6112-4c27-a63f-c533e885495c",
            username: "testcharacter",
            user_id: 3,
            char_name: "testy",
            strength: 5,
            intelligence: 2,
            charisma: 2,
            agility: 1,
            current_level: 0,
            current_points: 0,
            wins: 1,
            losses: 0,
            attrpoints: 0
        };
        ReactDOM.render(
            <FightProfile character={characterObject} />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  