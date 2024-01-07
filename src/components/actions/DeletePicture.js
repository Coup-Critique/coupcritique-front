import { useEffect } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
import { DELETE } from '@/constants/methods';
import useFetch from '@/hooks/useFetch';

// Special icon
const DeletePicture = ({ user, handleDelete, ...props }) => {
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (result?.success) {
			handleDelete('picture', null);
		}
	}, [result]);

	const handleLoad = e => load({ url: `users/picture/${user.id}`, method: DELETE });

	if (loading) {
		return <Loader active inline="centered" size="tiny" className="d-inline-block" />;
	}
	return (
		<Button
			color="red"
			className="double-icon"
			labelPosition="left"
			icon="image"
			content={
				<span>
					<Icon name="trash alternate" />
				</span>
			}
			title="supprimer l'image de profil"
			onClick={handleLoad}
		/>
	);
};
export default DeletePicture;
