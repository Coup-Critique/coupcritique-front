// modules
import React, { useState, useEffect } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// components
import TiersField from '@/components/fields/TiersField';
import useFetch from '@/hooks/useFetch';
import { addMessage } from '@/reducers/messages';
import { setTiers } from '@/reducers/tiers';
import { POST, PUT } from '@/constants/methods';
import { buildFieldsMessage } from '@/functions';

const FormResource = ({ handleCancel, handleSubmited, resource = {} }) => {
	const dispatch = useDispatch();
	const tiers = useSelector(state => state.tiers);
	const [form, setForm] = useState(resource);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});
	const [result, load, loading] = useFetch();
	const [resultTiers, loadTiers, loadingTiers] = useFetch();

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			loadTiers({ url: 'tiers-select' });
		}
	}, []);

	useEffect(() => {
		if (resultTiers && resultTiers.success) {
			dispatch(setTiers(resultTiers.tiers));
		}
	}, [resultTiers]);

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.success) {
				dispatch(addMessage(result.message, true));
				handleSubmited();
			}

			if (result.errors) {
				setMessage(buildFieldsMessage(result.errors));
			} else if (result.message) {
				setMessage({ form: result.message });
			}
		}
	}, [result]);

	const handleChange = (e, { name, value }) => setForm({ ...form, [name]: value });

	const handleTier = (tierId, gen) =>
		setForm({ ...form, gen: parseInt(gen), tier: { id: tierId } });

	const onSubmit = e => {
		e.preventDefault();
		// Pas de sécurité sur les urls car elles peuvent provenir de différentes ressources
		load({
			url: resource.id ? `resources/${resource.id}` : 'resources',
			method: resource.id ? PUT : POST,
			body: form,
		});
	};

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			className="mb-4"
			loading={loading || loadingTiers}
		>
			<Form.Input
				name="url"
				label="Url"
				defaultValue={form.url}
				placeholder={"Entrez l'url du lien"}
				onChange={handleChange}
				required
				message={message.url}
			/>
			<Form.Input
				name="category"
				label="Catégorie"
				defaultValue={form.category}
				placeholder={'Entrez la catégorie du lien'}
				onChange={handleChange}
				// required
				maxLength="100"
				message={message.category}
			/>
			<p className="mt-0 font-italic">Attention à écrire le nom correctement</p>
			<Form.Input
				name="title"
				label="Titre"
				defaultValue={form.title}
				placeholder={'Entrez le titre du lien'}
				onChange={handleChange}
				required
				maxLength="150"
				message={message.title}
			/>
			<TiersField
				label="Tier"
				tiers={tiers}
				currentTier={form.tier ? form.tier.id : undefined}
				currentGen={form.gen}
				handleChange={handleTier}
				message={message.tier || message.gen}
			/>
			<Message error content={message.form} />
			<div className="text-center">
				<Button
					color="orange"
					type="submit"
					content="Valider"
					disabled={loading}
				/>
				<Button
					color="grey"
					content="Annuler"
					onClick={handleCancel}
					disabled={loading}
				/>
			</div>
		</Form>
	);
};
export default FormResource;
