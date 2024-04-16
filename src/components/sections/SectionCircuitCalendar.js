import { memo } from 'react';
import { Label } from 'semantic-ui-react';
import { MONTHS_CUT } from '@/constants/months';

// const currentMonthIndex = new Date().getMonth();
// let months = MONTHS_CUT.slice();
// let firstPart = months.splice(0, currentMonthIndex);
// months = months.concat(firstPart);

const SectionCircuitCalendar = ({ calendar }) => {
	return (
		<section className="section-calendar">
			<div className="ui container">
				<h2 className="mb-4">Calendrier du circuit</h2>
				<div className="framed pb-1">
					<div className="inner">
						<div className="row m-0 mb-3">
							{MONTHS_CUT.map(month => (
								<div className="col-1 px-1" key={month}>
									<Label className="d-block text-center">{month}</Label>
								</div>
							))}
						</div>
						{calendar.map((row, j) => (
							<div className="row position-relative m-0 mb-4 pb-4" key={j}>
								{row.map((tour, i) => (
									<LabelPeriod key={i} tour={tour} />
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

const LabelPeriod = memo(function LabelPeriod({ tour }) {
	return (
		<Label
			className={'d-block position-absolute text-center colored'}
			style={{
				backgroundColor: tour.element.color,
				left: (tour.start * 100) / 12 + '%',
				width: ((tour.end - tour.start) * 100) / 12 + '%',
			}}
		>
			{tour.element.title}
		</Label>
	);
});

export default SectionCircuitCalendar;
