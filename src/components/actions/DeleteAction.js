// modules
import React, { useEffect } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
// custom
import useFetch from '../../hooks/useFetch';
import { DELETE } from '../../constants/methods';
import ModalConfirm from '../../modals/ModalConfirm';

const DeleteAction = ({ url, callback, isIcon = false, confirmProps }) => {
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	useEffect(() => {
		if (resultDelete) {
			if (resultDelete.success) {
				callback(resultDelete);
			}
		}
	}, [resultDelete]);

	const handleDelete = e => {
		if (loadingDelete) return;
		loadDelete({ url, method: DELETE });
	};

	let element = null;
	if (isIcon) {
		if (loadingDelete) {
			return (
				<Loader active inline="centered" size="mini" className="d-inline-block" />
			);
		}
		element = (
			<Icon
				link
				color="red"
				name="trash alternate"
				onClick={confirmProps ? undefined : handleDelete}
				title="supprimer"
			/>
		);
	} else {
		element = (
			<Button
				icon="trash alternate"
				color="red"
				content="Supprimer"
				onClick={confirmProps ? undefined : handleDelete}
				loading={loadingDelete}
			/>
		);
	}
	if (confirmProps) {
		return (
			<ModalConfirm
				{...confirmProps}
				trigger={element}
				handleConfirm={handleDelete}
				confirmButtonProps={{
					icon: 'trash alternate',
					color: 'red',
					content: 'Supprimer',
				}}
			/>
		);
	} else {
		return element;
	}
};
export default DeleteAction;
