// modules
import { combineReducers } from 'redux';
// reducers
import user from '@/reducers/user';
import gen from '@/reducers/gen';
import messages from '@/reducers/messages';
import tiers from '@/reducers/tiers';
import tags from '@/reducers/tags';
import guide_tags from '@/reducers/guide_tags';
import search from '@/reducers/search';
import darkMode from '@/reducers/darkMode';
import queries from '@/reducers/queries';
import ssrData from '@/reducers/ssrData';
import notifs from '@/reducers/notifs';
import cookie from '@/reducers/cookie';
import video_tags from '@/reducers/video_tags';
import actuality_tags from '@/reducers/actuality_tags';

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
