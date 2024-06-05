// modules

import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import { entityToEntities } from '@/constants/entities';
import { makeClassName } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Profile from '@/components/elements/Profile';
// import Image from 'next/image';

const Notification = ({ notification }) => {
	const link = `/entity/${entityToEntities[notification.entityName]}/${
		notification.entityId
	}`;
	return (
		<ScrollReveal
			className={makeClassName(
				'notification ui segment inverted',
				notification.color
			)}
			animation="zoomIn"
		>
			{(!!notification.subject
				|| !!notification.notifier
				|| !!notification.icon) && (
				<div
					className={makeClassName(
						'subject d-flex wrap align-items-end',
						!!notification.content && 'mb-2'
					)}
				>
					{!!notification.icon
						&& (notification.icon === 'comment' ? (
							<div className="fake-icon-circle mr-2">
								<img
									className="fake-icon"
									src={`/images/picto/comment-dark.svg`}
									alt="icon de commentaire"
									width={16}
									height={16}
								/>
							</div>
						) : (
							<Icon
								circular
								// size="large"
								inverted
								color={notification.color}
								name={notification.icon}
								className="mr-2"
							/>
						))}
					{!!notification.notifier && (
						<Profile
							user={notification.notifier}
							className="mr-3"
							hideName
							width={32}
							height={32}
						/>
					)}
					<Link href={link} className="extended-link">
						{notification.subject || ''}
					</Link>
				</div>
			)}
			{!!notification.content && (
				<p className="content">
					<Link href={link} className="extended-link">
						{notification.content}
					</Link>
				</p>
			)}
		</ScrollReveal>
	);
};

export default Notification;
