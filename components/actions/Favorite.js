'use client';
import { useEffect, useState } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
// custom
import useFetch from '@/hooks/useFetch';
import { PUT } from '@/constants/methods';

const counter = count => {
	if (count >= 1000000) {
		return (count / 1000000).toFixed(1) + 'M';
	} else if (count >= 1000) {
		return (count / 1000).toFixed(1) + 'K';
	} else {
		return count;
	}
};

const Favorite = ({ team, isIcon = false, size = 'large', action = true }) => {
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

	const handleFavorite = e => {
		e.stopPropagation();
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
			<>
				<Icon
					link
					name={isFavorite ? 'star' : 'star outline'}
					color="yellow"
					size={size}
					onClick={action ? handleFavorite : undefined}
					title={isFavorite ? 'Retirer des favoris' : 'Mettre en favoris'}
					className="m-0"
				/>
				<div className="small">
					{team.countEnjoyers ? counter(team.countEnjoyers) : null}
				</div>
			</>
		);
	}
	return (
		<Button
			color="yellow"
			icon={isFavorite ? 'star' : 'star outline'}
			content={isFavorite ? 'Retirer des favoris' : 'Mettre en favoris'}
			onClick={action ? handleFavorite : undefined}
			loading={loadingFavorite}
		/>
	);
};
export default Favorite;
