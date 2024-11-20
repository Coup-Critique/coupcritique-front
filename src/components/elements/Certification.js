// modules

import { Icon } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
// import Image from 'next/image';

const Certification = ({ team = {}, userId, className, big = false }) => {
	if (team.banned && team.certified) {
		return (
			<img
				className={makeClassName('picto certification', className)}
				src={`/images/picto/certified-red.svg`}
				alt="certifiée puis bannie"
				title="Équipe certifiée puis bannie"
				width="25"
				height="25"
			/>
		);
	}
	if (team.banned) {
		return (
			<Icon
				color="red"
				name="ban"
				title="Équipe bannie"
				size={big ? 'big' : 'large'}
			/>
		);
	}
	if (team.top_week) {
		return (
			<img
				className={makeClassName('picto certification', className)}
				src={`/images/picto/top-week.svg`}
				alt="top week"
				title="Est ou a été l'équipe de la semaine"
				width="25"
				height="25"
			/>
		);
	}
	if (team.certified) {
		return (
			<img
				className={makeClassName('picto certification', className)}
				src={`/images/picto/certified.svg`}
				alt="certifiée"
				title="Équipe certifiée"
				width="25"
				height="25"
			/>
		);
		// return (
		// 	<Icon
		// 		color="green"
		// 		name="check circle"
		// 		title="Equipe certifiée"
		// 		size={big ? 'big' : 'large'}
		// 	/>
		// );
	}
	if (userId && team.certified === false && team.user.id === userId) {
		return <b className={makeClassName(big && 'pr-2 text-underline')}>VUE</b>;
		// return <Icon name="minus circle" color="grey" size="large" />;
	}
	return null;
};

export default Certification;
