// modules
import React, { useEffect, useState } from 'react';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { PUT } from '../../constants/methods';
import { buildFieldsMessage } from '../../functions';
import useFetch from '../../hooks/useFetch';

const FormDescription = ({
	handleUpdate,
	handleCancel,
	putUrl,
	keyResult,
	entity,
	json = false,
}) => {
	const [description, setDescription] = useState(entity.description);
	const [result, load, loading] = useFetch();
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.success) {
				handleUpdate(result[keyResult]);
				handleCancel();
			} else if (result.errors) {
				setMessage(buildFieldsMessage(result.errors));
			} else if (result.message) {
				setMessage({ description: result.message });
			}
		}
	}, [result]);

	const handleChange = (e, { value }) => setDescription(value);

	const handleSubmit = e => {
		load({
			url: putUrl,
			method: PUT,
			body: { ...entity, description },
		});
	};

	const handleCancelBuffer = e => {
		e.preventDefault();
		handleCancel(e);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			loading={loading}
			error={!success}
			success={success}
			className="description framed"
		>
			<Form.TextArea
				className="text"
				maxLength="3000"
				name="description"
				placeholder="Description"
				onChange={handleChange}
				defaultValue={description}
				error={message.description}
			/>
			{json && (
				<p className="font-medium font-italic">
					&gt; Vous pouvez insérer des liens ou des miniatures d'entités de la
					façon suivante (en anglais) : [EntityName:Element Name] (un tiret au
					lieu de l'espace pour les Pokémon).
					<br />
					Exemples&nbsp;: [Pokemon:Landorus-Therian], [Item:Choice Band],
					[Move:Close Combat], [Ability:Huge Power], [Type:Normal].
				</p>
			)}
			<Message success content={message.form} className="text" />
			<Message error content={message.form} className="text" />
			<Button content="Valider" icon="check" color="green" />
			<Button
				content="Annuler"
				icon="x"
				color="grey"
				onClick={handleCancelBuffer}
			/>
		</Form>
	);
};

export default FormDescription;
