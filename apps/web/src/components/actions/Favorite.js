// modules
import { useEffect, useState } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
// custom
import useFetch from '@/hooks/useFetch';
import { PUT } from '@/constants/methods';

const Favorite = ({ team, isIcon = false, size = 'large' }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [resultFavorite, loadFavorite, loadingFavorite] = useFetch();

	useEffect(() => {
		if (team) {
			setIsFavorite(team.isOwnUserFavorite);
		}
	}, [team]);

	useEffect(() => {
		if (resultFavorite?.success) {
			setIsFavorite(!isFavorite);
		}
	}, [resultFavorite]);

	const handleFavorite = () => {
		loadFavorite({
			url: `teams/favorite/${team.id}/${!isFavorite}`,
			method: PUT,
		});
	};

	if (isIcon) {
		if (loadingFavorite) {
			return (
				<Loader
					active
					inline="centered"
					size="small"
					className="d-inline-block ml-1"
				/>
			);
		}
		return (
			<Icon
				link
				name={isFavorite ? 'star' : 'star outline'}
				color="yellow"
				size={size}
				onClick={handleFavorite}
				title={isFavorite ? 'Retirer des favoris' : 'Mettre en favoris'}
			/>
		);
	}
	return (
		<Button
			color="yellow"
			icon={isFavorite ? 'star' : 'star outline'}
			content={isFavorite ? 'Retirer des favoris' : 'Mettre en favoris'}
			onClick={handleFavorite}
			loading={loadingFavorite}
		/>
	);
};
export default Favorite;
