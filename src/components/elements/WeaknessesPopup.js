import React from 'react';
import Type from './Type';

const WeaknessesPopup = ({ weaknesses }) => {
	const immuneTypes = weaknesses.filter(weakness => weakness.ratio === 0);
	const veryResistantTypes = weaknesses.filter(weakness => weakness.ratio === 0.25);
	const resistantTypes = weaknesses.filter(weakness => weakness.ratio === 0.5);
	const weakToTypes = weaknesses.filter(weakness => weakness.ratio === 2);
	const veryWeakToTypes = weaknesses.filter(weakness => weakness.ratio === 4);

	return (
		<>
			{immuneTypes.length > 0 && (
				<div className="mb-2">
					Immunisé à&nbsp;:
					<br />
					{immuneTypes.map((type, i) => (
						<Type type={type.type_attacker} key={i} />
					))}
				</div>
			)}
			{veryResistantTypes.length > 0 && (
				<div className="mb-2">
					Très résistant à&nbsp;:
					<br />
					{veryResistantTypes.map((type, i) => (
						<Type type={type.type_attacker} key={i} />
					))}
				</div>
			)}
			{resistantTypes.length > 0 && (
				<div className="mb-2">
					Résiste à&nbsp;:
					<br />
					{resistantTypes.map((type, i) => (
						<Type type={type.type_attacker} key={i} />
					))}
				</div>
			)}
			{weakToTypes.length > 0 && (
				<div className="mb-2">
					Vulnérable à&nbsp;:
					<br />
					{weakToTypes.map((type, i) => (
						<Type type={type.type_attacker} key={i} />
					))}
				</div>
			)}
			{veryWeakToTypes.length > 0 && (
				<div className="mb-2">
					Très vulnérable à&nbsp;:
					<br />
					{veryWeakToTypes.map((type, i) => (
						<Type type={type.type_attacker} key={i} />
					))}
				</div>
			)}
		</>
	);
};

export default WeaknessesPopup;
