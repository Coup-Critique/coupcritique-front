// modules
import React, { useState, useEffect } from 'react';
import useFetch, { FILE_TYPE } from '@/hooks/useFetch';

// components
import { Button, Form, Message } from 'semantic-ui-react';
import { POST, PUT } from '@/constants/methods';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/reducers/messages';
import MultiImageField from '@/components/fields/MultiImageField';
import { Link } from 'react-router-dom';
import Wysiwyg from '@/components/Wysiwyg';
import { buildFieldsMessage } from '@/functions';
import useSaveToStorage from '@/hooks/useSaveToStorage';

const FormTournament = ({ handleSubmited, tournament = {} }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(tournament);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState('');
	const [result, load, loading] = useFetch();
	const [resultImages, uploadImages, loadingImages] = useFetch();
	const [images, setImages] = useState([]);
	const [defaultWysiwyg, setDefaultWysiwyg] = useState(tournament.description);
	const saveStorage = stored => {
		setForm(stored);
		setDefaultWysiwyg(stored.description);
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
			if (resultImages.success) {
				handleSubmited();
			} else {
				setSuccess(false);
				setMessage(resultImages.message);
			}
		}
	}, [resultImages]);

	const handleChange = (e, { name, value }) => setForm({ ...form, [name]: value });
	const handleChangeEditor = value => setForm({ ...form, description: value });
	const handleImages = (name, value) => setImages(value);

	const handleRemoveImage = i => {
		if (form.images[i]) {
			const images = form.images.slice();
			images.splice(i, 1);
			setForm({ ...form, images });
		}
	};

	const handleUploadImages = (files = images) => {
		uploadImages({
			url: `tournaments/${result.tournament.id}/images`,
			method: POST,
			body: { files },
			contentType: FILE_TYPE,
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		load({
			url: tournament.id ? `tournaments/${tournament.id}` : 'tournaments',
			method: tournament.id ? PUT : POST,
			body: form,
		});
	};

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
				placeholder={'Entrez le titre du tournoi'}
				onChange={handleChange}
				required
				maxLength={255}
				message={message.title}
			/>
			<MultiImageField
				dirName="/images/tournaments/"
				files={images}
				defaultImages={form.images}
				btnColor="orange"
				handleChange={handleImages}
				nbMax={5 - (form.images ? form.images.length : 0)}
				disabled={!!form.images && form.images.length > 4}
				handleRemove={handleRemoveImage}
			/>
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
			</Form.Field>
			<Message error content={message} />
			<div className="text-center">
				<Button
					color="orange"
					type="submit"
					content="Valider"
					disabled={loading}
				/>
				<Button
					as={Link}
					to={'/entity/tournaments/' + (tournament.id || '')}
					color="grey"
					content="Annuler"
				/>
			</div>
		</Form>
	);
};
export default FormTournament;
