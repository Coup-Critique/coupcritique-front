'use client';
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { isToday } from '@/functions';
import useFetch from '@/hooks/useFetch';
import ModalConfirm from '@/components/modals/ModalConfirm';

const TeamTopButton = ({ team /* isIcon = false */ }) => {
	const [result, load, loading] = useFetch();
	const [topWeek, setTopWeek] = useState(team.top_week);

	useEffect(() => {
		if (result?.team){
			setTopWeek(result.team.top_week);
		}
	}, [result]);

	// Update Team week
	const handleSelected = () => load({ url: `teams/top/${team.id}`, method: 'PUT' });

	const date = topWeek ? new Date(topWeek) : null;
	const remove = date && isToday(date);
	const icon = 'calendar ' + (remove ? 'times' : 'check');
	return (
		<ModalConfirm
			handleConfirm={handleSelected}
			confirmButtonProps={{
				icon: 'calendar ' + (remove ? 'times' : 'check'),
				color: remove ? 'red' : 'blue',
				content: 'Valider',
			}}
			trigger={
				<Button
					color="blue"
					icon={'calendar ' + (topWeek ? 'alternate' : 'check')}
					content={
						topWeek
							? 'Équipe de la semaine depuis le '
							  + date.toLocaleDateString('fr')
							: 'Mettre en équipe de la semaine'
					}
					// onClick={handleSelected}
					loading={loading}
				/>
			}
		>
			{remove ? (
				`Êtes-vous sûr de vouloir retirer le statut "équipe de la semaine" à cette équipe\u00A0?`
			) : (
				<>
					Êtes-vous sûr de vouloir faire de cette équipe "l'équipe de la
					semaine"&nbsp;?
					<br />
					Pour une semaine à partir d'aujourd'hui.
				</>
			)}
		</ModalConfirm>
	);
};

export default TeamTopButton;
