'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ActiveLink from '@/components/ActiveLink';
import { Dropdown, Loader } from 'semantic-ui-react';
import useLogout from '@/hooks/useLogout';
import Profile from '@/components/elements/Profile';
import DarkModeToggle from '@/components/fields/DarkModeToggle';
import SignPanel from '@/components/SignPanel';

const MenuUser = () => {
	const logout = useLogout();
	const user = useSelector(state => state.user);
	const notifs = useSelector(state => state.notifs);
	const [open, setOpen] = useState(false);

	if (user.loading && user.id) return <Loader inline active />;

	if (!user.token) return <SignPanel isModal loading={user.loading} />;

	const handleClose = e => {
		if (!e.target.classList.contains('dark-mode-checkbox')) {
			setOpen(false);
		}
	};
	const handleBlurClose = e => {
		if (!e.relatedTarget || e.relatedTarget.type !== 'checkbox') {
			setOpen(false);
		}
	};

	return (
		<Dropdown
			trigger={
				<Profile
					user={user}
					noLink
					hideName
					iconProps={{ color: 'black' }}
					height="50"
					wieght="50"
				/>
			}
			icon={null}
			pointing="top right"
			className="profile-dropdown"
			open={open}
			onOpen={() => setOpen(true)}
			onClose={handleClose}
			closeOnBlur={false}
			onBlur={handleBlurClose}
		>
			<Dropdown.Menu>
				<Dropdown.Item className="position-relative">
					<DarkModeToggle />
				</Dropdown.Item>
				<ActiveLink exact role="option" className="item" href="/user">
					Mon Compte
				</ActiveLink>
				<ActiveLink
					exact
					role="option"
					className="item position-relative"
					href="/notifications"
				>
					Mes Notifications {!!notifs && <span className="text-orange">*</span>}
				</ActiveLink>
				<ActiveLink
					exact
					role="option"
					className="item"
					href="/entity/teams/favorites"
				>
					Mes Favoris
				</ActiveLink>
				<Link href="/" role="option" className="item red" onClick={logout}>
					Déconnexion
				</Link>
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default MenuUser;
