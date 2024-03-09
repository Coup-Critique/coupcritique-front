import { useState, useEffect } from 'react';
import { FormField, Icon, Label, Segment } from 'semantic-ui-react';
import { megaBytesToBits } from '@/functions';

const MultiImageField = ({
	name = 'images',
	dirName = '/images/',
	label = 'Déposer des images',
	btnColor,
	nbMax = 5,
	maxMo = 1,
	files = [],
	defaultImages = [],
	handleChange,
	errorGiven,
	disabled = false,
	handleRemove,
	nopreview = false,
}) => {
	const [error, setError] = useState(false);

	useEffect(() => {
		if (errorGiven) {
			// Error is defined localy too
			setError(errorGiven);
		}
	}, [errorGiven]);

	const handleFiles = evt => {
		let files = evt.target.files;
		let send_files = [];
		if (files.length) {
			for (let [i, file] of Object.entries(files)) {
				if (i > nbMax - 1) {
					setError(
						`Vous essayez d'importer plus ${
							nbMax > 1 ? `de ${nbMax} fichiers` : `d'un fichier`
						}.`
					);
					break;
				}
				if (
					file.type !== 'image/jpeg'
					&& file.type !== 'image/png'
					// && file.type !== 'image/png'
				) {
					setError(`Le format du fichier ${i + 1} est incorrecte.`);
					continue;
				}
				if (file.size > megaBytesToBits(maxMo)) {
					// prettier-ignore
					setError(`Le fichier ${i + 1} est trop volumineux, il fait plus de ${maxMo}Mo.`);
					continue;
				}
				send_files.push(file);
			}
			handleChange(name, send_files);
		}
	};

	return (
		<Segment>
			<Segment className="d-flex align-items-center p-2" color="grey" inverted>
				<FormField error={!!error} className="mb-0 mr-3">
					{!!error && (
						<Label prompt pointing="right" role="alert">
							{error}
						</Label>
					)}
					<Label
						htmlFor={name}
						color={btnColor}
						className="ui button clap m-0"
						as="label"
					>
						{label}
					</Label>
					<input
						type="file"
						className="d-none"
						accept="image/jpeg,image/png" //image/gif,
						id={name}
						name={name}
						onChange={handleFiles}
						multiple="multiple"
						disabled={disabled}
					/>
				</FormField>
				<input
					type="hidden"
					name="MAX_FILE_SIZE"
					value={megaBytesToBits(maxMo)}
				/>
				<p className="mention">
					Types de fichiers autorisés&nbsp;: png&nbsp;; jpg&nbsp;; jpeg&nbsp;.
					Taille maximale&nbsp;: {maxMo} Mo.{' '}
					{nbMax > 1 && `${nbMax} fichiers maximum.`}
				</p>
			</Segment>
			<div className="row">
				{defaultImages.map((path, i) => (
					<div
						className="col-12 cols-6 col-md-4 col-lg-3 col-custom-xl-5"
						key={i}
					>
						<Icon
							name="remove circle"
							color="red"
							size="large"
							link
							className="position-absolute m-0"
							style={{ top: 0, right: '15px' }}
							onClick={e => handleRemove(i)}
						/>
						<img
							key={i}
							src={`${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${dirName}/${path}`}
							className="img-fluid"
							alt={`${i} enregistrée`}
						/>
					</div>
				))}
				{!nopreview
					&& files.map((file, i) => (
						<div
							className="col-12 cols-6 col-md-4 col-lg-3 col-custom-xl-5"
							key={i}
						>
							<img
								key={i}
								src={URL.createObjectURL(file)}
								className="img-fluid"
								alt={`${i} déposée`}
							/>
						</div>
					))}
			</div>
		</Segment>
	);
};

export default MultiImageField;
