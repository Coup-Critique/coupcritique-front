// modules
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import DeleteAction from '../actions/DeleteAction';
import FormResource from '../forms/FormResource';
import Tier from './Tier';

const Resource = ({
	resource,
	isAdmin = false,
	handleReload,
	setFlex,
	fromTier = false,
}) => {
	const [updating, setUpdating] = useState(false);

	const handleUpdating = e => {
		setUpdating(true);
		setFlex(false);
	};
	const handleCancel = e => {
		setUpdating(false);
		setFlex(true);
	};

	if (updating) {
		return (
			<FormResource
				resource={resource}
				handleCancel={handleCancel}
				handleSubmited={handleReload}
			/>
		);
	}
	return (
		<li className="resource">
			{!fromTier && resource.tier ? (
				<Tier tier={resource.tier} displayGen={false} className="mr-2" />
			) : (
				<img src="/images/picto/pokeball-red.png" alt="puce pokéball"
				width={25}
				height={26} />
			)}
			<a href={resource.url} target="_blank" rel="noreferrer nofollow">
				{resource.title}
			</a>
			{isAdmin && (
				<>
					<Icon
						link
						name="pencil"
						onClick={handleUpdating}
						title="modifier"
						className="ml-2 mr-0"
					/>
					<DeleteAction
						url={`resources/${resource.id}`}
						isIcon
						callback={handleReload}
					/>
				</>
			)}
		</li>
	);
};
export default Resource;
