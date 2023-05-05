// modules
import React, { useState, useEffect } from 'react';
import useFetch, { FILE_TYPE } from '@/hooks/useFetch';

// components
import { Button, Header, Form, Segment, Message, Icon } from 'semantic-ui-react';
import { POST, PUT } from '@/constants/methods';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/reducers/messages';
import MultiImageField from '@/components/fields/MultiImageField';
import Wysiwyg from '@/components/Wysiwyg';
import TagsField from '@/components/fields/TagsField';
import { buildFieldsMessage } from '@/functions';
import TiersField from '@/components/fields/TiersField';
import { useHistory } from 'react-router-dom';
import useSaveToStorage from '@/hooks/useSaveToStorage';

const FormGuide = ({ handleSubmited, guide = {}, tags = [], tiers, loadingTiers }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [form, setForm] = useState(guide);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState('');
	const [result, load, loading] = useFetch();
	const [resultImages, uploadImages, loadingImages] = useFetch();
	const [images, setImages] = useState([]);
	const [addResource, setAddResource] = useState(!!form.resource);
	const [defaultWysiwyg, setDefaultWysiwyg] = useState(guide.description);
	const saveStorage = stored => {
		setForm(stored);
		setDefaultWysiwyg(stored.description);
		if (stored.resource && !addResource) {
			setAddResource(true);
		}
	};
	const [voidStorage] = useSaveToStorage(form, saveStorage);

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.success) {
				voidStorage();
				dispatch(addMessage(result.message, true));
				if (images.length) {
					handleUploadImages();
				} else {
					handleSubmited();
				}
			}

			if (result.errors) {
				setMessage(buildFieldsMessage(result.errors));
			} else if (result.message) {
				setMessage({ form: result.message });
			}
		}
	}, [result]);

	useEffect(() => {
		if (resultImages) {
			if (!resultImages.success) {
				setSuccess(false);
				setMessage(resultImages.message);
			} else {
				handleSubmited();
			}
		}
	}, [resultImages]);

	const handleChange = (e, { name, value }) => setForm({ ...form, [name]: value });
	const handleChangeEditor = value => setForm({ ...form, description: value });
	const handleImages = (name, value) => setImages(value);
	const handleChangeTags = (name, tags) => setForm({ ...form, tags });

	const handleAddResource = (e, value) => {
		e.preventDefault();
		setForm({ ...form, resource: value ? guide.resource : null });
		setAddResource(value);
	};

	const handleChangeResource = (e, { name, value }) =>
		setForm({ ...form, resource: { ...form.resource, [name]: value } });

	const handleTier = (tierId, gen) => {
		setForm({
			...form,
			resource: { ...form.resource, gen: parseInt(gen), tier: { id: tierId } },
		});
	};

	const handleRemoveImage = i => {
		if (form.images[i]) {
			const images = form.images.slice();
			images.splice(i, 1);
			setForm({ ...form, images });
		}
	};

	const handleUploadImages = (body = images) => {
		uploadImages({
			url: `guides/${result.guide.id}/images`,
			method: POST,
			body,
			contentType: FILE_TYPE,
		});
	};

	const handleCancel = e => {
		e.preventDefault();
		history.replace('entity/guides/' + (guide.id || ''));
	};

	const onSubmit = e => {
		e.preventDefault();
		load({
			url: guide.id ? `guides/${guide.id}` : 'guides',
			method: guide.id ? PUT : POST,
			body: form,
		});
	};

	const getSelectedTags = () => {
		return tags.map(tag => {
			if (form.tags.findIndex(guideTag => guideTag.id === tag.id) > -1) {
				return { ...tag, selected: true };
			}
			return tag;
		});
	};

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			className="mb-4"
			loading={loading || loadingImages || loadingTiers}
		>
			<Form.Input
				name="title"
				label="Titre"
				defaultValue={form.title}
				placeholder="Entrez le titre du guide"
				onChange={handleChange}
				required
				maxLength={255}
				message={message.title}
			/>
			<MultiImageField
				dirName="/images/guides/"
				files={images}
				defaultImages={form.images}
				btnColor="orange"
				handleChange={handleImages}
				nbMax={5 - (form.images ? form.images.length : 0)}
				disabled={!!form.images && form.images.length > 4}
				handleRemove={handleRemoveImage}
			/>
			{addResource ? (
				<Segment className="mt-0">
					<Header as="h3">
						Lien utile
						<Icon
							name="x"
							style={{ fontSize: 'initial' }}
							circular
							color="red"
							link
							inverted
							className="float-right"
							onClick={e => handleAddResource(e, false)}
						/>
					</Header>
					<Form.Input
						name="category"
						label="Catégorie"
						defaultValue={form.resource ? form.resource.category : null}
						placeholder={'Entrez la catégorie du lien'}
						onChange={handleChangeResource}
						// required
						maxLength="100"
						message={message.category}
					/>
					<p className="mt-0 font-italic">
						Attention à écrire le nom correctement
					</p>
					<TiersField
						label="Tier"
						tiers={tiers}
						currentTier={
							form.resource && form.resource.tier
								? form.resource.tier.id
								: undefined
						}
						currentGen={form.resource ? form.resource.gen : undefined}
						handleChange={handleTier}
						message={message.tier || message.gen}
					/>
					<Message error content={message.form} />
				</Segment>
			) : (
				<Button
					color="orange"
					className="mb-3"
					onClick={e => handleAddResource(e, true)}
				>
					Ajouter un lien utile
				</Button>
			)}
			{tags.length > 0 && (
				<TagsField
					label="Catégories"
					name="tags"
					tags={form.tags ? getSelectedTags() : tags}
					handleChange={handleChangeTags}
				/>
			)}
			<Form.Input
				name="shortDescription"
				label="Description Courte"
				defaultValue={form.shortDescription}
				placeholder="Description affichée en mode liste"
				onChange={handleChange}
				maxLength={150}
				message={message.shortDescription}
			/>
			<Form.Field>
				<label>Description</label>
				<Wysiwyg
					defaultValue={defaultWysiwyg}
					placeholder="Description affichée en mode page"
					handleChange={handleChangeEditor}
					className="mb-0"
				/>
			</Form.Field>
			<Message error content={message.description} />
			<div className="text-center">
				<Button
					color="orange"
					type="submit"
					content="Valider"
					disabled={loading}
				/>
				<Button color="grey" content="Annuler" onClick={handleCancel} />
			</div>
		</Form>
	);
};
export default FormGuide;
