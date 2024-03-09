'use client';
import { useEffect } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
import { PUT } from '@/constants/methods';
import useFetch from '@/hooks/useFetch';

const UserModoButton = ({ user, handleModo, isIcon = false }) => {
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (result?.success) {
			if (handleModo) {
				handleModo('is_modo', result.is_modo);
			}
		}
	}, [result]);

	const handleLoad = e => load({ url: `users/modo/${user.id}`, method: PUT });

	if (user.is_admin || user.banned || user.deleted) return null;
	if (user.is_modo) {
		if (isIcon) {
			if (loading) {
				return (
					<Loader
						active
						inline="centered"
						size="tiny"
						className="d-inline-block"
					/>
				);
			}
			return (
				<Button
					color="red"
					className="double-icon"
					labelPosition="left"
					icon="gem"
					onClick={handleLoad}
					content={
						<span>
							<Icon name="angle double down" />
						</span>
					}
					title="retirer le rôle modérateur"
				/>
			);
		}
		return (
			<Button
				color="red"
				icon="x"
				content="Retirer le rôle Modérateur"
				onClick={handleLoad}
				loading={loading}
			/>
		);
	}
	if (isIcon) {
		if (loading) {
			return (
				<Loader active inline="centered" size="tiny" className="d-inline-block" />
			);
		}
		return (
			<Button
				color="violet"
				className="double-icon"
				labelPosition="left"
				icon="gem"
				onClick={handleLoad}
				content={
					<span>
						<Icon name="angle double up" />
					</span>
				}
				title="rendre modérateur"
			/>
		);
	}
	return (
		<Button
			color="violet"
			icon="angle double up"
			content="Rendre Modérateur"
			onClick={handleLoad}
			loading={loading}
		/>
	);
};

export default UserModoButton;
