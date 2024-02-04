import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableOneTeam from '../table/TableOneTeam';
import useFetch from '@/hooks/useFetch';

const SectionWeeklyTeam = props => {
	const user = useSelector(state => state.user);
	const [team, setTeam] = useState(props.team);
	const [result, load] = useFetch();
	useEffect(() => {
		if (!user.loading) {
			load({ url: `teams/top` });
		}
	}, [user.loading, user.id]);
	useEffect(() => {
		if (result?.success && result.team) {
			setTeam(result.team);
		}
	}, [result]);
	
	return (
		<section className="section-weekly-team">
			<div className="ui container">
				<h2>Équipe de la semaine</h2>
				<div className="top-team">
					{team ? (
						<TableOneTeam reverse team={team} isLink />
					) : (
						<p>Équipe indisponible.</p>
					)}
				</div>
			</div>
		</section>
	);
};
export default SectionWeeklyTeam;
