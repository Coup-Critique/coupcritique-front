// modules
import { memo } from 'react';
// components
import { Tab } from 'semantic-ui-react';
import FormSignIn from '@/components/forms/FormSignIn';
import FormSignUp from '@/components/forms/FormSignUp';
import FormForgottenPassword from '@/components/forms/FormForgottenPassword';
import { makeClassName } from '@/functions';

const SignTab = memo(function SignTab({ className, triggerHeight, ...props }) {
	const panes = [
		{
			menuItem: 'Connexion',
			render: () => (
				<Tab.Pane>
					<FormSignIn triggerHeight={triggerHeight} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Inscription',
			render: () => (
				<Tab.Pane>
					<FormSignUp triggerHeight={triggerHeight} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Mot de passe oublié',
			render: () => (
				<Tab.Pane>
					<FormForgottenPassword triggerHeight={triggerHeight} />
				</Tab.Pane>
			),
		},
	];
	return (
		<Tab panes={panes} className={makeClassName('sign-tab', className)} {...props} />
	);
});
export default SignTab;
