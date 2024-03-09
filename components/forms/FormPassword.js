'use client';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
// actions
import { setToken } from '@/reducers/user';
// hooks
import useFetch from '@/hooks/useFetch';
// functions
import { buildFieldsMessage } from '@/functions';
import { PUT } from '@/constants/methods';

const FormPassword = () => {
	const dispatch = useDispatch();
	const [result, load, loading] = useFetch();
	const [old_password, setOldPassword] = useState('');
	const [new_password, setNewPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.errors) {
				setMessage(buildFieldsMessage(result.errors));
			} else {
				setMessage({ form: result.message });
			}
			if (result.success) {
				dispatch(setToken(result.token));
			}
		}
	}, [result]);

	function checkValues() {
		if (new_password !== confirmation) {
			setMessage({
				confirmation:
					'Le nouveau mot de passe et sa confirmation sont différents',
			});
			return false;
		}
		return true;
	}

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (!loading && checkValues()) {
				load({
					url: 'own-user/password',
					method: PUT,
					body: {
						old_password,
						new_password,
						confirmation,
					},
				});
			}
		},
		[old_password, new_password, confirmation]
	);

	return (
		<Form error={!success} success={success} onSubmit={onSubmit} loading={loading}>
			<Form.Input
				name="old_password"
				type="password"
				label="Mot de passe actuel"
				placeholder="Entrez votre mot de passe actuel"
				onChange={e => setOldPassword(e.target.value)}
				error={message.old_password}
				required
			/>
			<Form.Input
				name="new_password"
				type="password"
				label="Nouveau mot de passe"
				placeholder="Entrez votre nouveau mot de passe"
				onChange={e => setNewPassword(e.target.value)}
				required
			/>
			<Form.Input
				name="confirmation"
				type="password"
				label="Confirmation du nouveau mot de passe"
				placeholder="Entrez de nouveau votre nouveau mot de passe"
				onChange={e => setConfirmation(e.target.value)}
				error={message.confirmation}
				required
			/>
			<Message error content={message.form} />
			<Message success content={message.form} />
			<div className="text-center">
				<Button color="orange" type="submit" disabled={loading}>
					Valider
				</Button>
			</div>
		</Form>
	);
};

export default FormPassword;
