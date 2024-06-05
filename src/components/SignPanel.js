// modules
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
// components
import { Button, Modal, Tab } from 'semantic-ui-react';
import FormSignIn from '@/components/forms/FormSignIn';
import FormSignUp from '@/components/forms/FormSignUp';
import FormForgottenPassword from '@/components/forms/FormForgottenPassword';
import { makeClassName } from '@/functions';

function SignPanel({ isModal = false, loading = false }) {
	const darkMode = useSelector(state => state.darkMode);
	const [open, setOpen] = useState(false);
	const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
	const [tabHeight, setTabHeight] = useState('');
	const [heightChanged, setHeightChanged] = useState(false);

	useEffect(() => {
		if (open) {
			setTabHeight(`${document.getElementById('sign-tab-modaled').offsetHeight}px`);
		}
	}, [currentActiveIndex, heightChanged, open]);

	const handleIndexChange = (e, { activeIndex }) => {
		setCurrentActiveIndex(activeIndex);
	};

	const triggerHeight = useCallback(
		() => setHeightChanged(!heightChanged),
		[setHeightChanged, heightChanged]
	);

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
	if (isModal) {
		return (
			<Modal
				// open={open}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				style={{ height: tabHeight }}
				className={makeClassName('sign-modal', darkMode && 'dark-mode')}
				trigger={
					<Button color="orange" loading={loading}>
						Mon compte
					</Button>
				}
			>
				<Tab
					id="sign-tab-modaled"
					panes={panes}
					className="sign-tab"
					onTabChange={handleIndexChange}
				/>
			</Modal>
		);
	}
	return <Tab panes={panes} className="sign-tab" />;
}
export default SignPanel;
