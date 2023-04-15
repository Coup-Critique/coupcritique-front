import React, { useState, useEffect } from 'react';
import { FormField, Label } from 'semantic-ui-react';
import { megaBytesToBits } from '../../functions';

/**
 * @prop {string|undefined} name
 * @prop {string} label
 * @prop {string|undefined} btnColor
 * @prop {string|undefined} type
 * @prop {number|undefined} nbMax
 * @prop {number|undefined} maxMo
 * @prop {boolean|undefined} required
 * @prop {string} defaultImagePath
 * @prop {string|undefined} imageAlt
 * @prop {function} callback
 * @prop {string|undefined} errorGiven
 * @prop {boolean|undefined} loading
 */
const FileField = ({
	name = 'image',
	label,
	btnColor,
	nbMax = 1,
	maxMo = 5,
	required = false,
	defaultImagePath,
	imageAlt = 'Fichier à importer',
	callback,
	errorGiven,
}) => {
	const [error, setError] = useState(false);
	const [files, setFiles] = useState([]);

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
							nbMax > 1 ? `de ${nbMax} fichiers.` : `d'un fichier.`
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
			setFiles(send_files);
			callback(name, nbMax > 1 ? send_files : send_files[0]);
		}
	};

	return (
		<div
			className={'file-field' + (files[0] || defaultImagePath ? ' has-source' : '')}
		>
			{/* Display a given OR uploaded image */}
			{files[0] ? (
				<img
					src={URL.createObjectURL(files[0])}
					alt={imageAlt}
					className="render-image"
				/>
			) : defaultImagePath ? (
				<img src={defaultImagePath} alt={imageAlt} className="render-image" />
			) : null}
			<Label className="file-annotation" as="label" htmlFor={name}>
				Types de fichiers autorisés&nbsp;: <br />
				png&nbsp;; jpg&nbsp;; jpeg&nbsp;.
				<br /> Taille maximale&nbsp;: {maxMo} Mo.
				{nbMax > 1 && <div>{nbMax} fichiers maximum.</div>}
			</Label>
			<FormField error={!!error}>
				{!!error && (
					<Label prompt pointing="below" role="alert">
						{error}
					</Label>
				)}
				<Label
					htmlFor={name}
					color={btnColor}
					className="ui button clap"
					as="label"
				>
					{/* <Icon name="image" size="big" /> */}
					{label}
				</Label>
				<input
					type="file"
					className="input-file"
					accept="image/jpeg,image/png" //image/gif,
					id={name}
					name={name}
					onChange={handleFiles}
					multiple={nbMax > 1 ? 'multiple' : false}
					required={required}
				/>
			</FormField>
			<input type="hidden" name="MAX_FILE_SIZE" value={megaBytesToBits(maxMo)} />
		</div>
	);
};

export default FileField;
