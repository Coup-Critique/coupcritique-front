// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { makeClassName } from '@/functions';

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
}) => (
	<div
		className={makeClassName(
			'profile text-center',
			hideName && 'hide-name',
			big && 'big',
			className
		)}
	>
		<div className="position-relative margin-horizontally-centered" title="">
			{user.picture ? (
				<div className="picture">
					{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
					<img
						src={`/images/users/${big ? '' : '200px/'}${user.picture}`}
						alt={`Photo de profil de ${user.username}`}
						onError={e => {
							e.target.onerror = null;
							e.target.src = `/images/picto/user-circle-solid-${color}.svg`;
						}}
						width={width}
						height={height}
					/>
				</div>
			) : (
				<Icon
					name="user circle"
					className="picture"
					color={color}
					{...iconProps}
				/>
			)}
			{!noBadge && !hideName && <ProfileBadge user={user} />}
			{!noLink && (
				<Link
					to={`/entity/users/${user.id}`}
					className="extended-link text-break"
					title={hideName ? user.username : undefined}
				>
					<span className={hideName ? 'sr-only' : undefined}>
						{user.username}
					</span>
				</Link>
			)}
		</div>
		{!noLink && !noBadge && hideName && <ProfileBadge user={user} />}
	</div>
);

export const ProfileBadge = ({ user }) => {
	if (user.is_admin) {
		return <Icon name="chess queen" color="purple" title="administrateur" />;
	}
	if (user.is_modo) {
		return <Icon name="gem" color="violet" title="modérateur" />;
	}
	// if (user.is_vip) {
	// 	return <Icon name="star" color="yellow" title="V.I.P." />;
	// }
	// if (user.is_strategist) {
	// 	return <Icon name="chess bishop" color="brown" title="stratège" />;
	// }
	if (user.is_tiper) {
		return <Icon name="gratipay" color="red" title="tiper" />;
	}
	// if (user.is_subsciber) {
	// 	return <Icon name="twitch" color="purple" title="sub" />;
	// }
	return null;
};

export default Profile;
