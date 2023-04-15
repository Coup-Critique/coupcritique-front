// modules
import React, { useEffect } from 'react';
import { Button, Label, Loader } from 'semantic-ui-react';
import { PUT } from '../../constants/methods';
import useFetch from '../../hooks/useFetch';

const UserTiperButton = ({ user, isIcon = false, handleTiper }) => {
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (result && result.success) {
			handleTiper('is_tiper', result.is_tiper);
		}
	}, [result]);

	const handleLoad = e => load({ url: `users/tiper/${user.id}`, method: PUT });

	if (user.deleted) return null;

	if (isIcon) {
		if (loading) {
			return (
				<Loader active inline="centered" size="tiny" className="d-inline-block" />
			);
		}
		if (user.is_tiper) {
			return (
				<Label
					icon="times circle"
					color="red"
					size="large"
					title="retirer le rôle contributeur"
					className="rounded icon action-icon"
					onClick={handleLoad}
				/>
			);
		} else {
			return (
				<Label
					icon="gratipay"
					color="red"
					size="large"
					title="rendre contributeur"
					className="rounded icon action-icon"
					onClick={handleLoad}
				/>
			);
		}
	}

	if (user.is_tiper) {
		return (
			<Button
				color="red"
				icon="times circle"
				content="Retirer le rôle contributeur"
				onClick={handleLoad}
				loading={loading}
			/>
		);
	} else {
		return (
			<Button
				color="red"
				icon="gratipay"
				content="Rendre Contributeur"
				onClick={handleLoad}
				loading={loading}
			/>
		);
	}
};

export default UserTiperButton;
