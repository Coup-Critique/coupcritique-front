// modules

import { Icon } from 'semantic-ui-react';
import { IMG_VERSION } from '@/constants/img';
import { makeClassName } from '@/functions';
import Image from 'next/image';

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
			<Image
				className={makeClassName('picto certification', className)}
				src={`/images/picto/certified.svg`}
				alt="certifiée"
				width="25"
				height="25"
			/>
		);
	}
	if (userId && team.certified === false && team.user.id === userId) {
		return <b className={makeClassName(big && 'pr-2 text-underline')}>VUE</b>;
		// return <Icon name="minus circle" color="grey" size="large" />;
	}
	return null;
};

export default Certification;
