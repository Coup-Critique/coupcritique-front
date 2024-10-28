// modules
import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';

// components
import { Button, Form, Message } from 'semantic-ui-react';
import { POST, PUT } from '@/constants/methods';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/reducers/messages';
import { getYoutubeId, youtubeEmbedRegex } from '@/functions';
import TagsField from '@/components/fields/TagsField';

const defaultArray = [];
const FormVideo = ({
	handleCancel,
	handleSubmited,
	video = {},
	loadUrl = 'videos',
	addtionalFields,
	tags = defaultArray,
}) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(video);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState('');
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.success) {
				dispatch(addMessage(result.message, true));
				handleSubmited();
			} else {
				setMessage(result.message);
			}
		}
	}, [result]);

	const handleChange = (e, { name, value }) =>
		setForm(form => ({ ...form, [name]: value }));

	const handleChangeTags = (name, tags) => setForm(form => ({ ...form, tags }));

	const onSubmit = e => {
		e.preventDefault();
		let youtube_id = getYoutubeId(form.url);
		let url = 'https://www.youtube.com/embed/' + youtube_id;

		if (youtubeEmbedRegex.test(url)) {
			load({
				url: video.id ? `${loadUrl}/${video.id}` : loadUrl,
				method: video.id ? PUT : POST,
				body: {
					...form,
					url,
					youtube_id,
				},
			});
		} else {
			setMessage(
				"L'url n'est pas valide. (ex : https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
			);
			setSuccess(false);
			return;
		}
	};

	const getSelectedTags = () => {
		return tags.map(tag => {
			if (form.tags.findIndex(videoTag => videoTag.id === tag.id) > -1) {
				return { ...tag, selected: true };
			}
			return tag;
		});
	};

	return (
		<Form error={!success} success={success} onSubmit={onSubmit} className="mb-5">
			<Form.Input
				name="url"
				label="Url"
				defaultValue={form.url}
				placeholder={"Entrez l'url de la video"}
				onChange={handleChange}
				required
			/>
			<Form.Input
				name="title"
				label="Titre"
				defaultValue={form.title}
				placeholder={'Entrez le titre de la video'}
				onChange={handleChange}
				maxLength="128"
				required
			/>
			<Form.Input
				name="author"
				label="Auteur"
				defaultValue={form.author}
				placeholder={"Entrez l'auteur de la video"}
				onChange={handleChange}
				maxLength="128"
				required
			/>
			{tags.length > 0 && (
				<TagsField
					label="Catégories"
					name="tags"
					tags={form.tags ? getSelectedTags() : tags}
					handleChange={handleChangeTags}
				/>
			)}
			{!!addtionalFields &&
				addtionalFields.map((field, i) => (
					<Form.Input
						key={i}
						defaultValue={form[field.name]}
						{...field}
						onChange={handleChange}
					/>
				))}
			<Form.TextArea
				name="description"
				label="Description"
				rows="5"
				defaultValue={form.description}
				placeholder={'Entrez une petite description de la video'}
				onChange={handleChange}
				maxLength="600"
			/>
			<p className="mt-0 font-italic">
				Évitez de mettre plus de 5 lignes de texte.
			</p>
			<Message error content={message} />
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
export default FormVideo;
