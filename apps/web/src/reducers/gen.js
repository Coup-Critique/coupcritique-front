import { lastGen } from '@/constants/gens';

export const SET_GEN = 'setGen';

export const setGenAction = gen => ({ type: SET_GEN, gen });

const genReducer = (state = lastGen, action) => {
	switch (action.type) {
		case SET_GEN:
			return action.gen || state;

		default:
			return state;
	}
};
export default genReducer;
