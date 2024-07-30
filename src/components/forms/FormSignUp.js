// modules
import { useState, useCallback, useEffect } from 'react';
import { Form, Button, Message, Label, Icon, Checkbox } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
// hooks
import useFetch from '@/hooks/useFetch';
// functions
import { buildFieldsMessage, makeClassName } from '@/functions';
// constants
import { EMAIL_REGEX } from '@/constants';
import { POST } from '@/constants/methods';
import { addMessage } from '@/reducers/messages';
import Link from 'next/link';
// import Image from 'next/image';

const FormSignUp = ({ triggerHeight }) => {
	const dispatch = useDispatch();
	const [result, load, loading] = useFetch();
	const [formUser, setFormUser] = useState({});
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});
	const [cguChecked, setCguChecked] = useState(false);

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.errors) {
				setMessage(buildFieldsMessage(result.errors));
			} else {
				setMessage({ form: result.message });
			}
			if (result.success) {
				// dispatch(setUser({ ...result.user, token: result.token }));
				dispatch(addMessage(result.message, true));
				setMessage({ form: result.message });
			}
		}
	}, [result]);

	useEffect(() => {
		triggerHeight();
	}, [message]);

	const handleChange = (e, { name, value }) =>
		setFormUser(form => ({ ...formUser, [name]: value }));

	const handleCgu = e => {
		e.preventDefault();
		setCguChecked(!cguChecked);
	};

	const checkValues = () => {
		if (!EMAIL_REGEX.test(formUser.email)) {
			setSuccess(false);
			setMessage({ email: 'Email invalide' });
			return false;
		}
		if (formUser.password !== formUser.confirmation) {
			setSuccess(false);
			setMessage({
				confirmation: 'Le mot de passe et sa confirmation sont différents',
			});
			return false;
		}
		return true;
	};

	const onSubmit = e => {
		e.preventDefault();
		if (!cguChecked) {
			setMessage({
				cguAccepted:
					"Vous devez accepter les conditions générales d'utilisation.",
			});
			return;
		}
		if (checkValues()) {
			load({ url: 'users', method: POST, body: formUser });
		}
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
				onChange={handleChange}
				error={message.username}
				required
				maxLength="180"
			/>
			<Form.Input
				name="email"
				label="Email"
				placeholder="Entrez votre adresse email"
				onChange={handleChange}
				error={message.email}
				required
			/>
			<Form.Input
				name="discord_name"
				label="Pseudo Discord"
				placeholder="Entrez votre pseudo Discord"
				onChange={handleChange}
				error={message.discord_name}
				labelPosition="left"
				maxLength="40"
			>
				<Label basic>
					<Icon name="discord" size="large" color="blue" />
				</Label>
				<input />
			</Form.Input>
			<Form.Input
				name="showdown_name"
				label="Pseudo Showdown"
				placeholder="Entrez votre pseudo Showdown"
				onChange={handleChange}
				error={message.showdown_name}
				labelPosition="left"
				maxLength="40"
			>
				<Label basic className="icon">
					<img
						className="img-fluid img-icon"
						src="/images/picto/showdown-export.svg"
						alt="Icon de Pokemon Showdown"
						width={21}
						height={19}
					/>
				</Label>
				<input />
			</Form.Input>
			<Form.Input
				name="password"
				type="password"
				label="Mot de passe"
				placeholder="Entrez votre mot de passe"
				onChange={handleChange}
				required
			/>
			<Form.Input
				name="confirmation"
				type="password"
				label="Confirmation du nouveau mot de passe"
				placeholder="Entrez de nouveau votre nouveau mot de passe"
				onChange={handleChange}
				error={message.confirmation}
				required
			/>
			<div
				className={makeClassName(
					'field required',
					message.cguAccepted && 'error'
				)}
				// error={
				// 	message.cguAccepted
				// 		? { content: message.cguAccepted, pointing: 'left' }
				// 		: undefined
				// }
			>
				<div
					className={makeClassName(
						'ui checkbox',
						cguChecked && 'checked',
						message.cguAccepted && 'error'
					)}
				>
					<input
						name="cguAccepted"
						type="checkbox"
						className="hidden"
						required
						checked={cguChecked}
						onClick={handleCgu}
					/>
					<label htmlFor="cguAccepted" onClick={handleCgu}>
						J’ai pris connaissance des{' '}
						<Link href="/cgu">conditions générales d'utilisation</Link> du
						site coupcritique.fr
					</label>
				</div>
			</div>
			<Message
				success
				content={
					message.form && (
						<p dangerouslySetInnerHTML={{ __html: message.form }} />
					)
				}
			/>
			<Message
				error
				content={
					message.form && (
						<p dangerouslySetInnerHTML={{ __html: message.form }} />
					)
				}
			/>
			<p className="mention">
				En tant que responsable de traitement, coupcritique.fr traite vos données
				personnelles afin de vous permettre d’accéder aux services du site. Vous
				disposez de différents droits sur vos données, pour en savoir plus,
				consultez notre{' '}
				<Link href="/mentions-legales#privacy-policy">
					Politique de protection des données.
				</Link>
			</p>
			<div className="text-center">
				<Button
					aria-label="S'inscrire"
					color="orange"
					type="submit"
					disabled={loading}
				>
					Valider
				</Button>
			</div>
		</Form>
	);
};

export default FormSignUp;
