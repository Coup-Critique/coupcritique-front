// modules
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, Loader } from 'semantic-ui-react';
import DescriptionJsoned from '@/components/elements/DescriptionJsoned';
import dynamic from 'next/dynamic';

const FormDescription = dynamic(() => import('@/components/forms/FormDescription'), {
	loading: () => <Loader active inline="centered" />,
	ssr: false,
});

const Description = ({ entity, json = false, ...props }) => {
	const [updating, setUpdating] = useState(false);
	const user = useSelector(state => state.user);

	const handleCancel = e => setUpdating(false);
	const handleModify = e => setUpdating(true);

	if (updating) {
		return (
			<FormDescription
				entity={entity}
				json={json}
				handleCancel={handleCancel}
				{...props}
			/>
		);
	}
	if (!entity.description) {
		if (user.is_modo) {
			return (
				<Button
					color="blue"
					icon="plus"
					content="Ajouter une description"
					area-label="Ajouter une description"
					onClick={handleModify}
					className="btn-descr"
				/>
			);
		}
		return null;
	}
	if (json) {
		return (
			<DescriptionJsoned
				className="framed"
				description={entity.description}
				json={entity.contentJson}
				handleUpdate={user.is_modo === true && handleModify}
			/>
		);
	}
	return (
		<p className="description framed">
			{entity.description}{' '}
			{user.is_modo === true && (
				<Icon link name="pencil" title="modifier" onClick={handleModify} />
			)}
		</p>
	);
};
export default Description;
