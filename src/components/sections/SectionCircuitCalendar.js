import CircuitCalendar from '../CircuitCalendar';

const SectionCircuitCalendar = props => {
	return (
		<section className="section-calendar">
			<div className="ui container">
				<CircuitCalendar {...props} />
			</div>
		</section>
	);
};

export default SectionCircuitCalendar;
