// modules

import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
import { useEffect, useState } from 'react';
// import Image from 'next/image';

const defaultSrc = '/images/picto/user-circle-solid-white.svg';

const Profile = ({
	user,
	hideName = false,
	noLink = false,
	noBadge = false,
	className,
	// color="grey",
	iconProps,
	big = false,
	width = 50,
	height = 50,
}) => {
	const [imgError, setImgError] = useState(false);
	const badge = getBadge(user);

	useEffect(() => {
		setImgError(false);
	}, [user.id]);

	return (
		<div
			className={makeClassName(
				'profile text-center',
				{ hideName, big, noLink },
				className
			)}
		>
			<div className="position-relative" title="">
				<div className={makeClassName('picture', badge?.color)}>
					{user.picture ? (
						<img
							key={user.id}
							/* eslint-disable-next-line jsx-a11y/img-redundant-alt */
							src={
								imgError
									? process.env.NEXT_PUBLIC_API_URL +
									  `/images/uploads/users/${big ? '' : '200px/'}` +
									  user.picture
									: defaultSrc
							}
							alt={`Photo de profil de ${user.username}`}
							onError={e => {
								e.target.onerror = null;
								e.target.src = defaultSrc;
								setImgError(true);
							}}
							width={width}
							height={height}
						/>
					) : (
						<Icon name="user circle" /* color={color} */ {...iconProps} />
					)}
				</div>
				{!noBadge && badge && badge.name === 'certified' ? (
					<img
						className={makeClassName(
							'u-badge picto certification',
							badge.color
						)}
						src={defaultSrc}
						alt="certifiée"
						title={badge.title}
						width="10"
						height="10"
					/>
				) : (
					<Icon className="u-badge" {...badge} />
				)}
			</div>
			{noLink ? (
				<span className={hideName ? 'sr-only' : 'd-inline-block text-break mt-2'}>
					{user.username}
				</span>
			) : (
				<Link
					href={`/entity/users/${user.id}`}
					className="extended-link text-break mt-2"
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
	if (user.is_content_creator) {
		return { name: 'video camera', color: 'purple', title: 'créateur de contenu' };
	}
	if (user.is_winner) {
		return { name: 'trophy', color: 'gold', title: 'vainqueur de tournois' };
	}
	if (user.is_weeker) {
		return { name: 'star', color: 'blue', title: 'a posté une équipe de la semaine' };
	}
	if (user.is_certified) {
		return {
			name: 'certified',
			color: 'green',
			title: 'a posté une équipe certifiée',
		};
	}
	if (user.is_tiper) {
		return { name: 'heart', color: 'red', title: 'tiper' };
	}
	// if (user.is_subsciber) {
	// 	return { name:"twitch", color:"purple", title:"sub", };
	// }
	return null;
};

export default Profile;
