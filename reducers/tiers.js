export const SET_TIERS = 'SET_TIERS';
export const REMOVE_TIERS = 'REMOVE_TIERS';

export const setTiers = tiers => ({
	type: SET_TIERS,
	tiers,
});
export const removeTiers = () => ({ type: REMOVE_TIERS });

const reducer = (state = {}, action) => {
	switch (action.type) {
		case SET_TIERS:
			return action.tiers;

		case REMOVE_TIERS:
			return [];

		default:
			return state;
	}
};

export default reducer;
