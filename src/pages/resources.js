// module
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Button, Loader, Accordion, Label, Segment } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
import useFetch from '@/hooks/useFetch';
import Resource from '@/components/elements/Resource';
import FormResource from '@/components/forms/FormResource';
import PageWrapper from '@/components/PageWrapper';
import SectionAds from '@/components/sections/SectionAds';

const ResourcesPage = () => {
	const user = useSelector(state => state.user);
	const [displayForm, setDisplayForm] = useState(false);
	const [resources, setResources] = useState({});
	const [result, load, loading] = useFetch();
	const [flex, setFlex] = useState(true);

	useEffect(() => {
		handleLoad();
	}, []);

	useEffect(() => {
		if (result && result.success) setResources(result.resources);
	}, [result]);

	const handleLoad = () => load({ url: 'resources' });

	const handleAddResource = () => setDisplayForm(true);

	const handleCancel = e => {
		e.preventDefault();
		setDisplayForm(false);
	};

	const handleSubmited = () => {
		setDisplayForm(false);
		handleLoad();
	};

	return (
		<PageWrapper
			title="Liste des liens utiles sur la stratégie Pokémon"
			metatitle="Retrouvez de nombreuses ressources sur la stratégie Pokémon comme les Viability ranking, les Speed tier ou encore les Rôle compendium"
			more
		>
			{(user.is_admin || user.is_modo) && (
				<Button
					color="blue"
					content="Ajouter un lien"
					icon="plus"
					onClick={handleAddResource}
					className="mb-4"
				/>
			)}
			{displayForm && (
				<FormResource
					handleCancel={handleCancel}
					handleSubmited={handleSubmited}
				/>
			)}
			<div className={makeClassName('resource-list', flex && 'd-flex')}>
				{loading ? (
					<Loader inline="centered" active />
				) : Object.keys(resources).length > 0 ? (
					Object.entries(resources).map(([gen, resources], i) =>
						Object.keys(resources).length ? (
							<Segment key={i} className={gen == '0' ? 'w-100' : ''}>
								{!!gen && gen != '0' && (
									<Label color="blue" className="gen">
										{gen}
									</Label>
								)}
								{Object.entries(resources).map(
									([category, resources], j) =>
										category ? (
											<ResourceAccordion
												key={j}
												category={category}
												resources={resources}
												setFlex={setFlex}
												user={user}
												handleLoad={handleLoad}
												defaultActiveIndex={
													gen == '0' ? 0 : undefined
												}
											/>
										) : null // this null is important
								)}
								{!!resources[''] && resources[''].length > 0 && (
									<ul className="inline">
										{resources[''].map(resource => (
											<Resource
												key={resource.id}
												setFlex={setFlex}
												resource={resource}
												isAdmin={user.is_modo}
												handleReload={handleLoad}
											/>
										))}
									</ul>
								)}
							</Segment>
						) : null
					)
				) : (
					<p>Aucun lien disponible.</p>
				)}
			</div>
			<SectionAds className="mt-4" />
		</PageWrapper>
	);
};

const ResourceAccordion = ({
	category,
	resources,
	setFlex,
	user,
	handleLoad,
	defaultActiveIndex,
}) => (
	<Accordion
		defaultActiveIndex={defaultActiveIndex}
		panels={[
			{
				key: category,
				title: <Accordion.Title>{category}</Accordion.Title>,
				content: (
					<Accordion.Content>
						<ul>
							{resources.map(resource => (
								<Resource
									key={resource.id}
									setFlex={setFlex}
									resource={resource}
									isAdmin={user.is_modo}
									handleReload={handleLoad}
								/>
							))}
						</ul>
					</Accordion.Content>
				),
			},
		]}
	></Accordion>
);

export default ResourcesPage;
