// modules
import React, { useEffect } from 'react';
import { Button, Label, Loader } from 'semantic-ui-react';
import { PUT } from '../../constants/methods';
import useFetch from '../../hooks/useFetch';

const UserBanButton = ({ user, isIcon = false, handleBan }) => {
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (result && result.success) {
			handleBan('banned', result.banned);
		}
	}, [result]);

	const handleLoad = e => load({ url: `users/ban/${user.id}`, method: PUT });

	if (user.is_modo || user.deleted) return null;

	if (isIcon) {
		if (loading) {
			return (
				<Loader active inline="centered" size="tiny" className="d-inline-block" />
			);
		}
		if (user.banned) {
			return (
				<Label
					icon="refresh"
					color="orange"
					size="large"
					title="débannir"
					className="rounded icon action-icon"
					onClick={handleLoad}
				/>
			);
		} else {
			return (
				<Label
					icon="ban"
					color="red"
					size="large"
					title="bannir"
					className="rounded icon action-icon"
					onClick={handleLoad}
				/>
			);
		}
	}

	if (user.banned) {
		return (
			<Button
				color="orange"
				icon="refresh"
				content="Débannir"
				onClick={handleLoad}
				loading={loading}
			/>
		);
	} else {
		return (
			<Button
				color="red"
				icon="ban"
				content="Bannir"
				onClick={handleLoad}
				loading={loading}
			/>
		);
	}
};

export default UserBanButton;
