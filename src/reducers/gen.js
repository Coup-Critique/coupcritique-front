import gens from '@/constants/gens.json';

export const SET_GEN = 'setGen';

export const setGenAction = gen => ({ type: SET_GEN, gen });

const defaultGen = gens.length && gens[0] ? gens[0].value : 1;
const genReducer = (state = defaultGen, action) => {
	switch (action.type) {
		case SET_GEN:
			return action.gen || state;

		default:
			return state;
	}
};
export default genReducer;
