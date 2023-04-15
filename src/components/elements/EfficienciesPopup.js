import React from 'react';
import Type from './Type';

const EfficienciesPopup = ({ efficiencies }) => {
	const noEffectTypes = efficiencies.filter(efficiency => efficiency.ratio === 0);
	// const reallyNotEffective = efficiencies.filter(efficiency => efficiency.ratio === 0.25);
	const notEffective = efficiencies.filter(efficiency => efficiency.ratio === 0.5);
	const effective = efficiencies.filter(efficiency => efficiency.ratio === 2);
	// const veryEffectiveToTypes = efficiencies.filter(efficiency => efficiency.ratio === 4);

	return (
		<>
			{noEffectTypes.length > 0 && (
				<div className="mb-2">
					N'a aucun effet sur&nbsp;:
					<br />
					{noEffectTypes.map((type, i) => (
						<Type type={type.type_defender} key={i} />
					))}
				</div>
			)}
			{/* {reallyNotEffective.length > 0 && (
				<div className="mb-2">
					Super efficace à&nbsp;:
					<br />
					{reallyNotEffective.map((type, i) => (
						<Type type={type.type_defender} key={i} />
					))}
				</div>
			)} */}
			{notEffective.length > 0 && (
				<div className="mb-2">
					Pas très efficace sur&nbsp;:
					<br />
					{notEffective.map((type, i) => (
						<Type type={type.type_defender} key={i} />
					))}
				</div>
			)}
			{effective.length > 0 && (
				<div className="mb-2">
					Super efficace sur&nbsp;:
					<br />
					{effective.map((type, i) => (
						<Type type={type.type_defender} key={i} />
					))}
				</div>
			)}
			{/* {veryEffectiveToTypes.length > 0 && (
				<div className="mb-2">
					Très vulnérable à&nbsp;:
					<br />
					{veryEffectiveToTypes.map((type, i) => (
						<Type type={type.type_defender} key={i} />
					))}
				</div>
			)} */}
		</>
	);
};

export default EfficienciesPopup;
