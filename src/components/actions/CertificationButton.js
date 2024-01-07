// modules
import { useEffect } from 'react';
import { Button, Icon, Label, Loader } from 'semantic-ui-react';
import { PUT } from '@/constants/methods';
import useFetch from '@/hooks/useFetch';

const CertificationButton = ({ isIcon = false, team = {}, handleCertif }) => {
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (result?.success) {
			if (handleCertif) {
				handleCertif('certified', result.certified);
			}
		}
	}, [result]);

	const handleLoad = certified => {
		load({ url: `teams/certify/${team.id}/${certified}`, method: PUT });
	};

	if (isIcon) {
		if (loading) {
			return (
				<Loader active inline="centered" size="tiny" className="d-inline-block" />
			);
		}
		return (
			<>
				{team.certified !== true && (
					<Label
						color="green"
						title="certifier"
						icon="check"
						size="large"
						className="rounded icon action-icon"
						onClick={e => handleLoad(true)}
					/>
				)}
				{team.certified !== false && (
					<Label
						color="red"
						icon="x"
						size="large"
						title="rejeter"
						className="rounded icon action-icon"
						onClick={e => handleLoad(false)}
					/>
				)}
			</>
		);
	}
	return (
		<>
			{team.certified !== true && (
				<Button
					color="green"
					icon="check circle"
					content="Certifier"
					onClick={e => handleLoad(true)}
					loading={loading}
				/>
			)}
			{team.certified !== false && (
				<Button
					color="red"
					icon="x"
					content="Rejeter la certif"
					onClick={e => handleLoad(false)}
					loading={loading}
				/>
			)}
		</>
	);
};
export default CertificationButton;
