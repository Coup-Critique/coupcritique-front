// modules
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
// actions
import { setUser } from '../../reducers/user';
// hooks
import useFetch from '../../hooks/useFetch';
// const
import { POST } from '../../constants/methods';
import { addMessage } from '../../reducers/messages';

const FormSignIn = ({ triggerHeight }) => {
	const dispatch = useDispatch();
	const [result, load, loading] = useFetch();
	const [resultUser, loadUser] = useFetch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [tokens, setTokens] = useState();
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (result) {
			if (result.success) {
				// setTokens only on component to wait for loadUser response before dispatch token.
				// If not, this component will be unmounted and user will not be gotten
				setTokens({ token: result.token, refreshToken: result.refresh_token });
				loadUser({
					url: 'own-user',
					token: result.token,
				});
			} else {
				setSuccess(false);
				setMessage({ form: result.message });
			}
		}
	}, [result]);

	useEffect(() => {
		if (resultUser) {
			if (resultUser.success) {
				dispatch(addMessage('Connecté', true));
				resultUser.user.token = tokens.token;
				resultUser.user.refreshToken = tokens.refreshToken;
				dispatch(setUser(resultUser.user));
			} else {
				setSuccess(false);
				setMessage({ form: resultUser.message });
			}
		}
	}, [resultUser]);

	useEffect(() => {
		triggerHeight();
	}, [message]);

	const onSubmit = e => {
		e.preventDefault();
		load({ url: 'login', method: POST, body: { username, password } });
	};

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			loading={loading}
			// className="fit-content"
		>
			<Form.Input
				name="username"
				label="Pseudo"
				placeholder="Entrez votre pseudo"
				onChange={e => setUsername(e.target.value)}
				error={message.username}
				required
			/>
			<Form.Input
				name="password"
				type="password"
				label="Mot de passe"
				placeholder="Entrez votre mot de passe"
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<Message
				error
				content={
					message.form && (
						<p dangerouslySetInnerHTML={{ __html: message.form }} />
					)
				}
			/>
			<Message
				success
				content={
					message.form && (
						<p dangerouslySetInnerHTML={{ __html: message.form }} />
					)
				}
			/>
			<div className="text-center">
				<Button color="orange" type="submit" disabled={loading}>
					Valider
				</Button>
			</div>
		</Form>
	);
};

export default FormSignIn;
