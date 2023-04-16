// modules
import React, { useState } from 'react';
import { Dropdown, FormField, FormInput, Icon, Label } from 'semantic-ui-react';
import gens from '@/constants/gens.json';
import { makeClassName } from '@/functions';

const lastGen = gens.length && gens[0] ? gens[0].value : 1;
const TiersField = ({
	tiers = [],
	fixedGen,
	message,
	className,
	required = false,
	currentGen,
	currentTier,
	handleChange,
	lockOldOfficial = false,
	...props
}) => {
	if (!Object.keys(tiers).length) return null;
	if (fixedGen) {
		return (
			<FormField
				name="tier"
				required={required}
				error={message}
				{...props}
				className={className}
				control="select"
			>
				{!required && <option value={0} />}
				{!!tiers[fixedGen]
					&& tiers[fixedGen].map(
						tier =>
							tier.playable && (
								<option key={tier.id} value={tier.id}>
									{tier.name}
								</option>
							)
					)}
				{tiers[0].map(
					tier =>
						tier.playable
						&& tier.gen === fixedGen && (
							<option key={tier.id} value={tier.id}>
								{tier.name}
							</option>
						)
				)}
			</FormField>
		);
	}

	const currentTierValue =
		(tiers[currentGen] && tiers[currentGen].find(tier => tier.id == currentTier))
		|| tiers[0].find(tier => tier.id == currentTier)
		|| null;

	return (
		<Dropdown
			className={makeClassName('field', className, required && 'required')}
			icon={null}
			floating={false}
			upward={false}
			trigger={
				<FormInput
					name="tier"
					icon
					labelPosition="right"
					action
					value={
						currentTierValue
							? `[GEN${currentTierValue.gen}] ${currentTierValue.name}`
							: currentGen
							? `GEN ${currentGen}`
							: ''
					}
					error={!!message}
					required={required}
					{...props}
				>
					<input disabled />
					<Icon name="dropdown" />
					<Label
						color="red"
						className="clickable close"
						icon="close"
						title="vider"
						onClick={e => {
							e.preventDefault();
							handleChange(undefined, undefined);
						}}
					/>
				</FormInput>
			}
		>
			<Dropdown.Menu>
				<div className="row">
					{Object.entries(tiers)
						.sort(([gen1], [gen2]) => {
							if (gen1 == '0') return -1;
							if (gen2 == '0') return 1;
							return gen2 - gen1;
						})
						.map(([gen, tiers], i) => (
							<div
								className="col-6 col-sm-3 col-md-2 col-custom-lg-8 col-custom-xl-10 mb-2"
								key={i}
							>
								<Dropdown.Header
									content={gen == '0' ? 'Officiel' : 'Gen ' + gen}
									onClick={e =>
										gen && gen != '0' && handleChange(undefined, gen)
									}
									className={makeClassName(
										gen && gen != '0' && 'activable',
										currentGen === gen && !currentTier && 'active'
									)}
								/>
								{tiers.map(tier => {
									const oldOfficial =
										gen == '0' && (tier.gen != lastGen || !tier.main);
									if (lockOldOfficial && oldOfficial) return null;
									return (
										<Dropdown.Item
											key={tier.id}
											value={tier.id}
											text={
												(tier.shortName || tier.name)
												+ (gen == '0'
													? ' '
													  + gens[gens.length - tier.gen]?.name
													: '')
											}
											onClick={e => handleChange(tier.id, tier.gen)}
											className={
												currentGen === tier.gen
												&& currentTier === tier.id
													? 'active'
													: undefined
											}
										/>
									);
								})}
							</div>
						))}
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default TiersField;
// export default React.memo(TiersField);
