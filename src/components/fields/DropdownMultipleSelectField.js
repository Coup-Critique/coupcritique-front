// modules

import { FormField, Label, Dropdown } from 'semantic-ui-react';

// controlled
const DropdownMultipleSelectField = ({
	label,
	name,
	placeholder,
	value = [],
	error,
	options,
	className,
	children,
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
				name={name}
				placeholder={placeholder}
				aria-label={placeholder || 'Sélectionner des ' + label}
				{...props}
			/>
			{!!error && (
				<Label prompt pointing className="above" role="alert">
					{error}
				</Label>
			)}
			{children}
		</FormField>
	);
};

export default DropdownMultipleSelectField;
