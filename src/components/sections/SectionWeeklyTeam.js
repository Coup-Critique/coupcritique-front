import TableOneTeam from '../table/TableOneTeam';

const SectionWeeklyTeam = ({ team }) => (
	<section className="section-weekly-team">
		<div className="ui container">
			<h2>Équipe de la semaine</h2>
			<div className="top-team">
				{team ? <TableOneTeam team={team} /> : <p>Équipe indisponible.</p>}
			</div>
		</div>
	</section>
);
export default SectionWeeklyTeam;
