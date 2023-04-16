// modules
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { IMG_VERSION } from '@/constants/img';
import { makeClassName } from '@/functions';

const Certification = ({ team = {}, userId, className, big = false }) => {
	if (team.banned) {
		return (
			<Icon
				color="red"
				name="ban"
				title="Equipe bannie"
				size={big ? 'big' : 'large'}
			/>
		);
	}
	if (team.certified) {
		return (
			<img
				className={makeClassName('picto certification', className)}
				src={`/images/picto/certified.svg?ver=${IMG_VERSION}`}
				alt="certifiée"
				width="25"
				height="25"
			/>
		);
	}
	if (team.certified === false && team.user.id === userId) {
		return <b className={makeClassName(big && 'pr-2 text-underline')}>VUE</b>;
		// return <Icon name="minus circle" color="grey" size="large" />;
	}
	return null;
};

export default Certification;
