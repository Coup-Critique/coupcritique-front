// modules

import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
// import Image from 'next/image';

const Profile = ({
	user,
	hideName = false,
	noLink = false,
	noBadge = false,
	className,
	color = 'grey',
	iconProps,
	big = false,
	width = 50,
	height = 50,
}) => {
	const badge = getBadge(user);
	return (
		<div
			className={makeClassName(
				'profile text-center',
				hideName && 'hide-name',
				big && 'big',
				className
			)}
		>
			<div className="position-relative" title="">
				<div className={makeClassName('picture', badge?.color)}>
					{user.picture ? (
						<img
							/* eslint-disable-next-line jsx-a11y/img-redundant-alt */
							src={`${
								process.env.NEXT_PUBLIC_API_URL
							}/images/uploads/users/${big ? '' : '200px/'}${user.picture}`}
							alt={`Photo de profil de ${user.username}`}
							onError={e => {
								e.target.onerror = null;
								e.target.src = `/images/picto/user-circle-solid-${color}.svg`;
							}}
							width={width}
							height={height}
						/>
					) : (
						<Icon name="user circle" color={color} {...iconProps} />
					)}
				</div>
				{!noBadge && <Icon className="u-badge" {...badge} />}
			</div>
			{!noLink && (
				<Link
					href={`/entity/users/${user.id}`}
					className="extended-link text-break mt-3"
					title={hideName ? user.username : undefined}
				>
					<span className={hideName ? 'sr-only' : undefined}>
						{user.username}
					</span>
				</Link>
			)}
		</div>
	);
};

const getBadge = user => {
	if (user.is_admin) {
		return { name: 'chess queen', color: 'purple', title: 'administrateur' };
	}
	if (user.is_modo) {
		return { name: 'gem', color: 'violet', title: 'modérateur' };
	}
	// if (user.is_winner) {
	// 	return { name:"trophy", color:"yellow", title:"vainqueur", };
	// }
	// if (user.is_vip) {
	// 	return { name:"star", color:"yellow", title:"V.I.P.", };
	// }
	if (user.is_tiper) {
		return { name: 'heart', color: 'red', title: 'tiper' };
	}
	// if (user.is_subsciber) {
	// 	return { name:"twitch", color:"purple", title:"sub", };
	// }
	return null;
};

export default Profile;
