import { memo } from 'react';
import { Label } from 'semantic-ui-react';
import { MONTHS_CUT } from '@/constants/months';
import Link from 'next/link';
import LinkButton from './buttons/LinkButton';
// import SpritePokemon from './elements/SpritePokemon';

// const currentMonthIndex = new Date().getMonth();
// let months = MONTHS_CUT.slice();
// let firstPart = months.splice(0, currentMonthIndex);
// months = months.concat(firstPart);

const CircuitCalendar = memo(function CircuitCalendar({ calendar, toList = false }) {
	return (
		<>
			<div className="h2-btn">
				<h2>Calendrier du Circuit Compétitif Coup Critique</h2>
				<LinkButton
					href={'/entity/circuit-tours' + (toList ? '/list' : '')}
					color="orange"
					inverted
				>
					Voir tous les tournois
				</LinkButton>
			</div>
			<div className="calendar framed mt-0 pb-1">
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
		</>
	);
});

const LabelPeriod = memo(function LabelPeriod({ tour }) {
	return (
		<Label
			className={'d-block position-absolute text-center colored'}
			style={{
				backgroundColor: tour.element.color,
				left: (tour.start * 100) / 12 + '%',
				width: ((tour.end - tour.start) * 100) / 12 + '%',
			}}
			as={Link}
			href={`/entity/circuit-tours/${tour.element.id}`}
		>
			{tour.element.title}
		</Label>
	);
});

export default CircuitCalendar;
