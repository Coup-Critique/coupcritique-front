// modules
import React, { useEffect, useState } from 'react';
// components
import { Button, Modal } from 'semantic-ui-react';
import useDarkMode, { DARK_MODE_KEY } from '@/hooks/useDarkMode';
import { makeClassName } from '@/functions';

function ModalConfirm({
	// title,
	handleConfirm,
	className,
	trigger,
	confirmButtonProps,
	children,
	handleStopClick,
}) {
	const [darkMode] = useDarkMode();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (handleStopClick) {
			handleStopClick(open);
		}
	}, [open]);

	const handleOpen = e => {
		e.preventDefault();
		setOpen(true);
	};
	const handleClose = e => {
		e.preventDefault();
		setOpen(false);
	};
	const handleConfirmBuffer = e => {
		e.preventDefault();
		setOpen(false);
		handleConfirm(e);
	};

	return (
		<Modal
			onClose={handleClose}
			onOpen={handleOpen}
			open={open}
			trigger={trigger}
			className={makeClassName(darkMode && DARK_MODE_KEY, className)}
		>
			{/* {!!title && <Modal.Header>{title}</Modal.Header>} */}
			<Modal.Content className="font-weight-bold">{children}</Modal.Content>
			<Modal.Actions>
				<Button {...confirmButtonProps} onClick={handleConfirmBuffer} />
				<Button color="grey" content="Annuler" onClick={handleClose} />
			</Modal.Actions>
		</Modal>
	);
}

export default ModalConfirm;
