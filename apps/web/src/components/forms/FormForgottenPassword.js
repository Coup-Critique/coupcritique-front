// modules
import { useState, useCallback, useEffect } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// constants
import { EMAIL_REGEX } from '@/constants';
import { POST } from '@/constants/methods';

const FormForgottenPassword = ({ triggerHeight }) => {
	const [result, load, loading] = useFetch();
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState();

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			setMessage(result.message);
		}
	}, [result]);

	useEffect(() => {
		triggerHeight();
	}, [message]);

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (!EMAIL_REGEX.test(email)) {
				setSuccess(false);
				setMessage('Email invalide');
			} else if (!loading) {
				load({ url: 'reset-password', method: POST, body: { email } });
			}
		},
		[email]
	);

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			loading={loading}
			// className="fit-content"
		>
			<Form.Input
				name="email"
				label="Email"
				type="email"
				placeholder="Entrez votre adresse email"
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<Message
				error
				content={message && <p dangerouslySetInnerHTML={{ __html: message }} />}
			/>
			<Message
				success
				content={message && <p dangerouslySetInnerHTML={{ __html: message }} />}
			/>
			<div className="text-center">
				<Button color="orange" type="submit" disabled={loading}>
					Envoyer
				</Button>
			</div>
		</Form>
	);
};

export default FormForgottenPassword;
