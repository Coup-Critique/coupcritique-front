// modules
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import AdminTeams from '@/pages/admin/teams';
import AdminUsers from '@/pages/admin/users';
import AdminDrive from '@/pages/admin/drive';

const AdminRouter = () => {
	const user = useSelector(state => state.user);

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Redirect to="/404" />;
	}
	return (
		<Switch>
			{/* <Route exact path="/admin">
				<AdminHome />
			</Route> */}
			<Route exact path="/admin/teams">
				<AdminTeams />
			</Route>
			<Route exact path="/admin/users">
				<AdminUsers />
			</Route>
			<Route exact path="/admin/drive">
				<AdminDrive />
			</Route>
			{/* Redirection */}
			<Route path="/">
				<Redirect to="/404" />
			</Route>
		</Switch>
	);
};
export default AdminRouter;
