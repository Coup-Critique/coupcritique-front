import { lastGen } from '@/constants/gens';
import { STORAGE_KEY } from '@/hooks/useLocalStorage';

export const SET_GEN = 'setGen';

export const setGenAction = gen => ({ type: SET_GEN, gen });

const genReducer = (state = lastGen, action) => {
	switch (action.type) {
		case SET_GEN:
			localStorage.setItem(STORAGE_KEY + '-gen', action.gen);
			return action.gen || state;

		default:
			return state;
	}
};
export default genReducer;
