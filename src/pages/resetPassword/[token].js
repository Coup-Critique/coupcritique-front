import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Message, Form, Button } from 'semantic-ui-react';
//
import { PUT } from '@/constants/methods';
import useFetch from '@/hooks/useFetch';
import PageWrapper from '@/components/PageWrapper';
import { addMessage } from '@/reducers/messages';
import { redirect404 } from '../404';
import { rmUndefined } from '@/functions';

const ResetForgottenPassword = ({ token }) => {
	const dispatch = useDispatch();
	const router = useRouter();
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
			if (result.redirect) {
				dispatch(addMessage(result.messageRenewPassword, true));
				router.push('/');
			}
		}
	}, [result]);

	return (
		<PageWrapper
			title={'Mot de passe oublié'}
			className="page-reset-password"
			goingBack
		>
			{result &&
				(!result.success ? (
					<p
						className="text-center"
						dangerouslySetInnerHTML={{ __html: result.messageRenewPassword }}
					/>
				) : (
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
							<Button
								aria-label="Valider la modification du mot de passe"
								color="orange"
								type="submit"
							>
								Soumettre
							</Button>
						</div>
					</Form>
				))}
		</PageWrapper>
	);
};

export async function getServerSideProps({ query }) {
	const { token } = query;
	try {
		return { props: rmUndefined({ token }) };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
}

export default ResetForgottenPassword;
