// modules
// import { useEffect, useState } from 'react';
import { Divider, Tab } from 'semantic-ui-react';
// components
import Move from '@/components/elements/Move';
import SpritePokemon from '@/components/elements/SpritePokemon';
import SpriteItem from '@/components/elements/SpriteItem';
import { formatNumbers } from '@/functions';
import Ability from '@/components/elements/Ability';
import Spread from '@/components/elements/Spread';

const UsageStats = ({ usages = [] }) => {
	if (!usages.length) {
		return <p>Aucune statistique d'utilisation n'est disponible pour ce Pokémon.</p>;
	}
	return (
		<Tab
			panes={usages.map(usage => ({
				menuItem: usage.tier.shortName || usage.tier.name,
				render: () => <UsageStatsPane usage={usage} />,
			}))}
			menu={{
				color: 'blue',
				inverted: true,
				attached: true,
			}}
		/>
	);
};

const UsageStatsPane = ({ usage, loading }) => (
	<Tab.Pane className="usage-tab" loading={loading}>
		<div className="usage-stat-list">
			<span className="usage-stat-title">Usage&nbsp;:</span>
			<div>
				<em className="percent">{formatNumbers(usage.percent, 3)}&nbsp;%</em>
			</div>
		</div>
		<Divider section />
		{!!usage && (
			<>
				{!!usage.usageAbilities && usage.usageAbilities.length > 0 && (
					<>
						<UsageStat
							title="Talents"
							elements={usage.usageAbilities}
							Element={Ability}
							keyName="ability"
						/>
						<Divider section />
					</>
				)}
				{!!usage.usageItems && usage.usageItems.length > 0 && (
					<>
						<UsageStat
							title="Objets"
							elements={usage.usageItems}
							Element={SpriteItem}
							keyName="item"
						/>
						<Divider section />
					</>
				)}
				{!!usage.teamMates && usage.teamMates.length > 0 && (
					<>
						<UsageStat
							title="Équipiers"
							elements={usage.teamMates}
							Element={SpritePokemon}
							keyName="pokemon"
						/>
						<Divider section />
					</>
				)}
				{/* {!!usage.pokemonChecks && usage.pokemonChecks.length > 0 && (
					<>
						<UsageStat
							title="Contres"
							elements={usage.pokemonChecks}
							Element={SpritePokemon}
							keyName="pokemon"
						/>
						<Divider section />
					</>
				)} */}
				{!!usage.usageMoves && usage.usageMoves.length > 0 && (
					<>
						<UsageStat
							title="Capacités"
							elements={usage.usageMoves}
							Element={Move}
							keyName="move"
						/>
						<Divider section />
					</>
				)}
				{!!usage.usageSpreads && usage.usageSpreads.length > 0 && (
					<UsageStat
						title="Reparts"
						elements={usage.usageSpreads}
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
