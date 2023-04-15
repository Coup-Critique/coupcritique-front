// modules
import { combineReducers } from 'redux';
// reducers
import user from './user';
import gen from './gen';
import messages from './messages';
import tiers from './tiers';
import tags from './tags';
import guide_tags from './guide_tags';
import search from './search';
import darkMode from './darkMode';
import queries from './queries';
import ssrData from './ssrData';
import notifs from './notifs';
import cookie from './cookie';
import video_tags from './video_tags';
import actuality_tags from './actuality_tags';

const serverSide = (state = 'client') => state;

const reducerCombiner = combineReducers({
	user,
	notifs,
	gen,
	messages,
	tiers,
	tags,
	guide_tags,
	video_tags,
	actuality_tags,
	search,
	darkMode,
	queries,
	ssrData,
	cookie,
	serverSide,
});

export default reducerCombiner;
