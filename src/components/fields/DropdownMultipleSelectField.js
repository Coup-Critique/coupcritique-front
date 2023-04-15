// modules
import React from 'react';
import { FormField, Label, Dropdown } from 'semantic-ui-react';

// controlled
const DropdownMultipleSelectField = ({
	label,
	value = [],
	error,
	options,
	className,
	...props
}) => {
	const optionsToDropdown = options.map(el => ({
		key: el.id + '',
		text: el.name,
		value: el.id + '',
	}));

	return (
		<FormField className={className}>
			{!!label && <label>{label}</label>}
			<Dropdown
				multiple
				selection
				options={optionsToDropdown}
				value={value}
				error={!!error}
				{...props}
			/>
			{!!error && (
				<Label prompt pointing className="above" role="alert">
					{error}
				</Label>
			)}
		</FormField>
	);
};

export default DropdownMultipleSelectField;
