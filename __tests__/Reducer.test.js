import * as Actions from '../src/actions/Actions';
import reducer from '../src/reducer/';

describe('post reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({});
    });
});