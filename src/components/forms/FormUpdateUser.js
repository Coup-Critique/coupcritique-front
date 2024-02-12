// modules
import { useState, useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, Label, Message } from 'semantic-ui-react';
// actions
import { setUser, setUserPicture } from '@/reducers/user';
// hooks
import useFetch, { FILE_TYPE } from '@/hooks/useFetch';
// functions
import { buildFieldsMessage } from '@/functions';
// constants
import { EMAIL_REGEX } from '@/constants';
import { POST, PUT } from '@/constants/methods';
import FileField from '@/components/fields/FileField';
// import Image from 'next/image';

const initFormUser = ({ username, email, discord_name, showdown_name }) => ({
	username,
	email,
	discord_name,
	showdown_name,
});

const FormUpdateUser = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [result, load, loading] = useFetch();
	const [resultPicture, uploadPicture, loadingPicture] = useFetch();
	const [formUser, updateFormUser] = useReducer(
		(state, nextState) => ({ ...state, ...nextState }),
		user,
		initFormUser
	);
	const [picture, setPicture] = useState();
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (user.token) {
			updateFormUser(initFormUser(user));
		}
	}, [user]);

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.success) {
				setMessage({ form: result.message });
				dispatch(setUser({ ...result.user, token: result.token }));
				if (picture) {
					uploadPicture({
						url: `own-user/picture`,
						method: POST,
						body: { picture },
						contentType: FILE_TYPE,
					});
				}
			} else {
				if (result.errors) {
					setMessage(buildFieldsMessage(result.errors));
				} else {
					setMessage({ form: result.message });
				}
			}
		}
	}, [result]);

	useEffect(() => {
		if (resultPicture) {
			setSuccess(result.success);
			if (resultPicture.success) {
				dispatch(setUserPicture(resultPicture.picture));
			} else {
				setMessage({ picture: resultPicture.message });
			}
		}
	}, [resultPicture]);

	const handleChange = (e, { name, value }) => updateFormUser({ [name]: value });

	const handlePicture = (name, file) => setPicture(file);

	const checkValues = () => {
		let check = true;
		const tmpMessage = {};
		if (!EMAIL_REGEX.test(formUser.email)) {
			tmpMessage['email'] = 'Email invalide.';
			check = false;
		}
		if (!check) setSuccess(false);
		setMessage(tmpMessage);
		return check;
	};

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (checkValues()) {
				load({
					url: 'own-user',
					method: PUT,
					body: formUser,
				});
			}
		},
		[formUser]
	);

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			loading={loading || user.loading}
		>
			<FileField
				name="picture"
				label="Déposer une photo de profil"
				defaultImagePath={process.env.NEXT_PUBLIC_API_URL+'/images/uploads/users/' + user.picture}
				btnColor="orange"
				callback={handlePicture}
				imageAlt="Photo de profil"
				errorGiven={message.picture}
				loading={loadingPicture}
			/>
			<Form.Input
				name="username"
				label="Pseudo"
				defaultValue={formUser.username}
				placeholder="Entrez votre pseudo"
				onChange={handleChange}
				error={message.username}
			/>
			<Form.Input
				name="email"
				label="Email"
				type="email"
				defaultValue={formUser.email}
				placeholder="Entrez votre adresse email"
				onChange={handleChange}
				error={message.email}
			/>
			<Form.Input
				name="discord_name"
				label="Pseudo Discord"
				defaultValue={formUser.discord_name}
				placeholder="Entrez votre pseudo Discord"
				onChange={handleChange}
				error={message.discord_name}
				labelPosition="left"
			>
				<Label basic>
					<Icon name="discord" size="large" color="blue" />
				</Label>
				<input />
			</Form.Input>
			<Form.Input
				name="showdown_name"
				label="Pseudo Showdown"
				defaultValue={formUser.showdown_name}
				placeholder="Entrez votre pseudo Showdown"
				onChange={handleChange}
				error={message.showdown_name}
				labelPosition="left"
			>
				<Label basic className="icon">
					<img
						className="img-fluid img-icon"
						src="/images/picto/showdown-export.svg"
						alt="showdown export icon"
						width={21}
						height={19}
					/>
				</Label>
				<input />
			</Form.Input>
			{/* <blockquote>
                <Link href="/cgu">Conditions générales d'utilisations</Link> acceptées
                le&nbsp;: {user.cguDate}
            </blockquote> */}
			<Message success content={message.form} />
			<Message error content={message.form} />
			<div className="text-center">
				<Button color="orange" type="submit" disabled={loading}>
					Valider
				</Button>
			</div>
		</Form>
	);
};

export default FormUpdateUser;
