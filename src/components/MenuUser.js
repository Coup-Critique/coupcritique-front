import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Dropdown, Loader } from 'semantic-ui-react';
import useLogout from '@/hooks/useLogout';
import Profile from '@/components/elements/Profile';
import DarkModeToggle from '@/components/fields/DarkModeToggle';
import SignPanel from '@/components/SignPanel';

const MenuUser = () => {
	const logout = useLogout();
	const { user, notifs } = useSelector(state => state);
	const [open, setOpen] = useState(false);

	if (user.loading) return <Loader inline active />;

	if (!user.token) return <SignPanel isModal />;

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
					hideName
					noLink
					noBadge
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
				<NavLink exact role="option" className="item" to="/user">
					Mon Compte
				</NavLink>
				<NavLink
					exact
					role="option"
					className="item position-relative"
					to="/notifications"
				>
					Mes Notifications {!!notifs && <span className="text-orange">*</span>}
				</NavLink>
				<NavLink
					exact
					role="option"
					className="item"
					to="/entity/teams/favorites"
				>
					Mes Favoris
				</NavLink>
				<Link to="/" role="option" className="item red" onClick={logout}>
					Déconnexion
				</Link>
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default MenuUser;
