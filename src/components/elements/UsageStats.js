// modules
import React, { useEffect, useState } from 'react';
import { Divider, Tab } from 'semantic-ui-react';
// components
import Move from '@/components/elements/Move';
import SpritePokemon from '@/components/elements/SpritePokemon';
import SpriteItem from '@/components/elements/SpriteItem';
import { formatNumbers } from '@/functions';
import useFetch from '@/hooks/useFetch';
import Ability from '@/components/elements/Ability';
import Spread from '@/components/elements/Spread';

const UsageStats = ({ usages = [] }) => {
	const [currentUsage, setCurrentUsage] = useState(0);
	const [usagesData, setUsagesData] = useState([]);
	const [result, load] = useFetch(false);
	const [loadingIndex, setLoadingIndex] = useState();

	useEffect(() => {
		if (usages.length && !usagesData[currentUsage]) {
			load({ url: `usages/${usages[currentUsage].id}` });
			setLoadingIndex(currentUsage);
		}
	}, [usages, currentUsage]);

	useEffect(() => {
		if (result) {
			setLoadingIndex(undefined);
			if (result.success) {
				const nextUsagesData = usagesData.slice();
				nextUsagesData[currentUsage] = result.usage;
				setUsagesData(nextUsagesData);
			}
		}
	}, [result]);

	if (!usages.length) {
		return <p>Aucune statistique d'utilisation n'est disponible pour ce Pokémon.</p>;
	}
	return (
		<Tab
			onTabChange={(e, { activeIndex }) => setCurrentUsage(activeIndex)}
			panes={usages.map((usage, i) => ({
				menuItem: usage.tier.shortName || usage.tier.name,
				render: () => (
					<UsageStatsPane
						usage={usage}
						data={usagesData[i]}
						loading={loadingIndex === i}
					/>
				),
			}))}
			menu={{
				color: 'blue',
				inverted: true,
				attached: true,
			}}
		/>
	);
};

const UsageStatsPane = ({ usage, data, loading }) => (
	<Tab.Pane className="usage-tab" loading={loading}>
		<div className="usage-stat-list">
			<span className="usage-stat-title">Usage&nbsp;:</span>
			<div>
				<em className="percent">{formatNumbers(usage.percent, 3)}&nbsp;%</em>
			</div>
		</div>
		<Divider section />
		{!!data && (
			<>
				{!!data.usageAbilities && data.usageAbilities.length > 0 && (
					<>
						<UsageStat
							title="Talents"
							elements={data.usageAbilities}
							Element={Ability}
							keyName="ability"
						/>
						<Divider section />
					</>
				)}
				{!!data.usageItems && data.usageItems.length > 0 && (
					<>
						<UsageStat
							title="Objets"
							elements={data.usageItems}
							Element={SpriteItem}
							keyName="item"
						/>
						<Divider section />
					</>
				)}
				{!!data.teamMates && data.teamMates.length > 0 && (
					<>
						<UsageStat
							title="Équipiers"
							elements={data.teamMates}
							Element={SpritePokemon}
							keyName="pokemon"
						/>
						<Divider section />
					</>
				)}
				{/* {!!data.pokemonChecks && data.pokemonChecks.length > 0 && (
					<>
						<UsageStat
							title="Contres"
							elements={data.pokemonChecks}
							Element={SpritePokemon}
							keyName="pokemon"
						/>
						<Divider section />
					</>
				)} */}
				{!!data.usageMoves && data.usageMoves.length > 0 && (
					<>
						<UsageStat
							title="Capacités"
							elements={data.usageMoves}
							Element={Move}
							keyName="move"
						/>
						<Divider section />
					</>
				)}
				{!!data.usageSpreads && data.usageSpreads.length > 0 && (
					<UsageStat
						title="Reparts"
						elements={data.usageSpreads}
						Element={Spread}
					/>
				)}
			</>
		)}
	</Tab.Pane>
);

const UsageStat = ({ title, elements, Element, keyName }) => (
	<div className="usage-stat-list">
		<span className="usage-stat-title">{title}&nbsp;:</span>
		<div>
			{elements.map((el, i) => (
				<div key={i} className="usage-stat">
					{keyName ? (
						<Element {...{ [keyName]: el[keyName] }} />
					) : (
						<Element {...el} />
					)}
					{el.percent !== undefined && (
						<em className="percent">{formatNumbers(el.percent, 3)}&nbsp;%</em>
					)}
				</div>
			))}
		</div>
	</div>
);

export default UsageStats;
