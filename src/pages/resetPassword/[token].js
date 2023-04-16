import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { PUT } from '@/constants/methods';
import useFetch from '@/hooks/useFetch';
import PageWrapper from '@/components/PageWrapper';
import { Message, Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/reducers/messages';

const ResetForgottenPassword = () => {
	const dispatch = useDispatch();
	const { token } = useParams();
	const [result, load] = useFetch();
	const [success, setSuccess] = useState(true);
	const [new_password, setNewPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [message, setMessage] = useState({});

	useEffect(() => {
		load({ url: `check-renew-password-token/${token}` });
	}, []);

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
			if (checkValues()) {
				load({
					url: 'update-forgotten-password',
					method: PUT,
					body: {
						token,
						new_password,
					},
				});
			}
		},
		[new_password, confirmation]
	);

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.redirect) dispatch(addMessage(result.messageRenewPassword, true));
		}
	}, [result]);

	return (
		<PageWrapper title={'Mot de passe oublié'} className="page-reset-password">
			{result
				&& (!result.success ? (
					<p
						className="text-center"
						dangerouslySetInnerHTML={{ __html: result.messageRenewPassword }}
					/>
				) : !result.redirect ? (
					<Form error={!success} success={success} onSubmit={onSubmit}>
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
							<Button color="orange" type="submit">
								Soumettre
							</Button>
						</div>
					</Form>
				) : (
					<Redirect to="/" />
				))}
		</PageWrapper>
	);
};

export default ResetForgottenPassword;
