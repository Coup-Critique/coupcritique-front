// modules
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
// components
import { Button, Loader, Modal, Tab } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
import dynamic from 'next/dynamic';

const SignTab = dynamic(() => import('@/components/SignTab'), {
	loading: () => <Loader active inline="centered" />,
	ssr: false,
});

function SignPanel({ loading = false }) {
	const darkMode = useSelector(state => state.darkMode);
	const [open, setOpen] = useState(false);
	const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
	const [tabHeight, setTabHeight] = useState('0');
	const [heightChanged, setHeightChanged] = useState(false);

	const triggerHeight = useCallback(
		() => setHeightChanged(!heightChanged),
		[setHeightChanged, heightChanged]
	);

	useEffect(() => {
		if (open) {
			setTabHeight(`${document.getElementById('sign-tab-modaled').offsetHeight}px`);
		}
	}, [currentActiveIndex, heightChanged, open]);

	const handleIndexChange = useCallback(
		(e, { activeIndex }) => {
			setCurrentActiveIndex(activeIndex);
		},
		[setCurrentActiveIndex]
	);

	return (
		<Modal
			// open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			style={{ height: tabHeight }}
			className={makeClassName('sign-modal', darkMode && 'dark-mode')}
			trigger={
				<Button
					aria-label="Ouvrir le panneau de connexion, d'inscription ou de mot de passe oublié"
					color="orange"
					loading={loading}
				>
					Mon compte
				</Button>
			}
		>
			{open && (
				<SignTab
					id="sign-tab-modaled"
					onTabChange={handleIndexChange}
					triggerHeight={triggerHeight}
				/>
			)}
		</Modal>
	);
}
export default SignPanel;
