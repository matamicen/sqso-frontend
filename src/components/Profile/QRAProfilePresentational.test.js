import React from "react";
import {shallow} from 'enzyme';
import QRAProfile from "./QRAProfilePresentational";

describe('App', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error')
        console.error.mockImplementation(() => {})
      })
      afterEach(() => {
        console.error.mockRestore()
      })
    it('should render correctly in "debug" mode', () => {
        let qra = {
            qra: {qra
                :
                "LU2ACH"},
            qsos: [{qra
                :
                "LU2ACH"}]
        }
        let qraInfo = {
            firstname: "Lio"
        }
        const wrapper = shallow(<QRAProfile qra={qra} qraInfo={qraInfo}/>);

        expect(wrapper).toMatchSnapshot();
    });
});