import { INSTANCES_KEYS } from '@/constants/team';

export const SET_TEAM = 'SET_TEAM';
export const SET_VALUE = 'SET_VALUE';
export const SET_INSTANCE = 'SET_INSTANCE';
export const SET_INSTANCES = 'SET_INSTANCES';
export const REMOVE_INSTANCES = 'REMOVE_INSTANCES';

export const setTeamAction = value => ({ type: SET_TEAM, value });
export const setTeamValueAction = (name, value) => ({ type: SET_VALUE, name, value });
export const setTeamInstancesAction = team => ({
	type: SET_INSTANCES,
	instances: INSTANCES_KEYS.reduce(
		(instances, key) => ({ ...instances, [key]: team[key] }),
		{}
	),
});
export const removeTeamInstancesAction = () => ({ type: REMOVE_INSTANCES });

const formTeamReducer = (team, action) => {
	switch (action.type) {
		case SET_VALUE:
			return { ...team, [action.name]: action.value } || team;

		case SET_INSTANCES:
			return { ...team, ...action.instances } || team;

		case REMOVE_INSTANCES:
			const nextTeams = Object.assign({}, team);
			INSTANCES_KEYS.forEach(key => {
				nextTeams[key] = { description: team[key]?.description };
			});
			return nextTeams || team;

		case SET_TEAM:
			return action.value || team;

		default:
			return team;
	}
};
export default formTeamReducer;
