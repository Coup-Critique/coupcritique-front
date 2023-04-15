// modules
import React, { useState, useEffect, useCallback } from 'react';

// components
import { Button, Modal, Tab } from 'semantic-ui-react';
import FormSignIn from './forms/FormSignIn';
import FormSignUp from './forms/FormSignUp';
import FormForgottenPassword from './forms/FormForgottenPassword';
import useDarkMode, { DARK_MODE_KEY } from '../hooks/useDarkMode';

function SignPanel({ isModal = false }) {
	const [darkMode] = useDarkMode();
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
				className={'sign-modal' + (darkMode ? ` ${DARK_MODE_KEY}` : '')}
				trigger={<Button color="orange">Mon compte</Button>}
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
