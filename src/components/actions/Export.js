import React, { useState, useEffect } from 'react';
import { Button, Icon, TextArea, Popup, Segment, Rail } from 'semantic-ui-react';
import { copyToClipboard, makeClassName } from '../../functions/index';
import useDarkMode, { DARK_MODE_KEY } from '../../hooks/useDarkMode';

const TIMEOUT_LENGTH = 2000; // en milliseconde

const Export = ({ content, className }) => {
	const [displayExport, setDisplayExport] = useState(false);
	const [notCopied, setNotCopied] = useState(true);
	const [popupOpened, setPopupOpened] = useState(false);
	const [darkMode] = useDarkMode();
	let timer;

	useEffect(() => {
		setNotCopied(true);
		setDisplayExport(false);
	}, [content]);

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

	const getTeamExport = e => {
		setDisplayExport(!displayExport);
		if (displayExport) {
			handleClose(e);
		}
		if (notCopied) {
			copyToClipboard(content);
			setNotCopied(false);
		}
	};

	return (
		<Segment
			basic
			className={makeClassName('export-wrapper no-padding railed mt-0', className)}
		>
			<Rail internal position="right" className="auto">
				<Popup
					className={darkMode ? DARK_MODE_KEY : undefined}
					content={
						<span className="text-warning">
							<Icon name="copy" />
							Copié dans le presse-papier
						</span>
					}
					openOnTriggerClick={notCopied}
					position="left center"
					on="click"
					open={popupOpened}
					onOpen={handleOpen}
					onClose={handleClose}
					trigger={
						<Button
							className="export-btn"
							onClick={getTeamExport}
							color="blue"
						>
							Export
							<img
								className="fake-icon right"
								src="/images/picto/showdown-export-white.svg"
								alt="showdown export icon"
								width="17"
								height="16"
							/>
						</Button>
					}
				/>
			</Rail>
			{!!displayExport && (
				<TextArea className="export" rows="9" cols="35" defaultValue={content} />
			)}
		</Segment>
	);
};

export default Export;
