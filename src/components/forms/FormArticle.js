// modules
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Form, Message } from 'semantic-ui-react';
// components
import Wysiwyg from '@/components/Wysiwyg';
import MultiImageField from '@/components/fields/MultiImageField';
import TagsField from '@/components/fields/TagsField';
import useFetch, { FILE_TYPE } from '@/hooks/useFetch';
import useSaveToStorage from '@/hooks/useSaveToStorage';
import { POST, PUT } from '@/constants/methods';
import { addMessage } from '@/reducers/messages';
import { buildFieldsMessage } from '@/functions';
import { entitiesToEntity } from '@/constants/entities';

const defaultObject = {};
const defaultArray = [];

const FormArticle = ({
	handleSubmited,
	entityName,
	path = entityName,
	article = defaultObject,
	reinitiRef,
	tags = defaultArray,
	addtionalFields,
	addtionalWidths,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [form, setForm] = useState(article);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState('');
	const [result, load, loading] = useFetch();
	const [resultImages, uploadImages, loadingImages] = useFetch();
	const [images, setImages] = useState(defaultArray);
	const [defaultWysiwyg, setDefaultWysiwyg] = useState(article.description);
	const saveStorage = stored => {
		setForm(stored);
		setDefaultWysiwyg(stored.description);
	};
	const [voidStorage] = useSaveToStorage(form, saveStorage);
	const singularEntity = entitiesToEntity[entityName];

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
			if (resultImages.success) {
				handleSubmited();
			} else {
				setSuccess(false);
				setMessage(resultImages.message);
			}
		}
	}, [resultImages]);

	const handleChange = (e, { name, value, type }) => {
		if (type === 'number') value = Number(value);
		setForm(form => ({ ...form, [name]: value }));
	};
	
	const handleChangeEditor = value =>
		setForm(form => ({ ...form, description: value }));
	
	const handleImages = (name, value) => setImages(value);

	const handleChangeTags = (name, tags) => setForm(form => ({ ...form, tags }));

	const handleRemoveImage = i => {
		if (form.images[i]) {
			const images = form.images.slice();
			images.splice(i, 1);
			setForm({ ...form, images });
		}
	};

	const handleUploadImages = (body = images) => {
		uploadImages({
			url: `${entityName}/${result[singularEntity].id}/images`,
			method: POST,
			body,
			contentType: FILE_TYPE,
		});
	};

	const handleReinit = e => {
		e.preventDefault();
		voidStorage();
		router.reload();
	};

	const handleCancel = e => {
		e.preventDefault();
		voidStorage();
		router.back();
	};

	const onSubmit = e => {
		e.preventDefault();
		load({
			url: article.id ? `${entityName}/${article.id}` : entityName,
			method: article.id ? PUT : POST,
			body: form,
		});
	};

	const getSelectedTags = () => {
		return tags.map(tag => {
			if (form.tags.findIndex(articleTag => articleTag.id === tag.id) > -1) {
				return { ...tag, selected: true };
			}
			return tag;
		});
	};

	const AdditionalFields = addtionalWidths ? Form.Group : Form.Field;
	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			loading={loading || loadingImages}
			className="mb-4"
		>
			<Form.Input
				name="title"
				label="Titre"
				defaultValue={form.title}
				placeholder={"Entrez le titre de l'article"}
				onChange={handleChange}
				required
				maxLength={255}
				message={message.title}
			/>
			<MultiImageField
				dirName={entityName}
				files={images}
				defaultImages={form.images || defaultArray}
				btnColor="orange"
				handleChange={handleImages}
				nbMax={5 - (form.images ? form.images.length : 0)}
				disabled={!!form.images && form.images.length > 4}
				handleRemove={handleRemoveImage}
			/>
			{tags.length > 0 && (
				<TagsField
					label="Catégories"
					name="tags"
					tags={form.tags ? getSelectedTags() : tags}
					handleChange={handleChangeTags}
				/>
			)}
			{!!addtionalFields && (
				<AdditionalFields widths={addtionalWidths}>
					{addtionalFields.map((field, i) => (
						<Form.Input
							key={i}
							defaultValue={form[field.name]}
							{...field}
							onChange={handleChange}
						/>
					))}
				</AdditionalFields>
			)}
			<Form.Input
				name="shortDescription"
				label="Description Courte"
				defaultValue={form.shortDescription}
				placeholder={'Description affichée en mode liste'}
				onChange={handleChange}
				maxLength={150}
				message={message.shortDescription}
			/>
			<Form.Field>
				<label>Description</label>
				<Wysiwyg
					defaultValue={defaultWysiwyg}
					placeholder={'Description affichée en mode page'}
					handleChange={handleChangeEditor}
					className="mb-0"
				/>
				<Message error content={message.description} />
			</Form.Field>
			<Message error content={message} />
			<div className="text-center">
				<Button
					type="submit"
					color="orange"
					content="Valider"
					disabled={loading}
				/>
				<Button
					type="button"
					onClick={handleCancel}
					color="grey"
					content="Annuler"
				/>
				<Button
					ref={reinitiRef}
					type="button"
					icon="refresh"
					onClick={handleReinit}
					color="blue"
					content="Réinitialiser"
					className="d-none"
				/>
			</div>
		</Form>
	);
};
export default FormArticle;
