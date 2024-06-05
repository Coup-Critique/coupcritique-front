import { useState } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { copyToClipboard, makeClassName } from '@/functions/index';
import { useSelector } from 'react-redux';

const TIMEOUT_LENGTH = 2000; // en milliseconde

const CopyMail = ({ className, popupClassName }) => {
	const [notCopied, setNotCopied] = useState(true);
	const [popupOpened, setPopupOpened] = useState(false);
	const darkMode = useSelector(state => state.darkMode);
	let timer;

	const handleOpen = e => {
		setPopupOpened(true);
		timer = setTimeout(() => {
			setPopupOpened(false);
		}, TIMEOUT_LENGTH);
	};

	const handleClose = e => {
		setPopupOpened(false);
		if (timer) clearTimeout(timer);
	};

	const copy = e => {
		setPopupOpened(true);
		if (notCopied) {
			copyToClipboard('aide.coupcritique@gmail.com');
			setNotCopied(false);
		}
	};

	return (
		<Popup
			className={makeClassName(popupClassName, darkMode && 'dark-mode')}
			wide
			content={
				<span className="text-warning">
					<Icon name="copy" />
					aide.coupcritique@gmail.com copiée dans le presse-papier
				</span>
			}
			openOnTriggerClick={notCopied}
			position="right center"
			on="click"
			open={popupOpened}
			onOpen={handleOpen}
			onClose={handleClose}
			trigger={
				<span className={makeClassName('clickable', className)} onClick={copy}>
					<Icon name="mail" className="m-0" />
					<span className="sr-only">adresse email</span>
				</span>
			}
		/>
	);
};

export default CopyMail;
