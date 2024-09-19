// modules
import { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { makeClassName } from '@/functions';

// Can't be real form because it can be contain in another form
const FormSearch = ({
	defaultValue = '',
	placeholder = 'Rechercher',
	label,
	handleSearch,
	loading,
	message,
	searchRef,
	className,
}) => {
	const [string, setString] = useState(defaultValue);
	const [error, setError] = useState(message);

	const onKeyDown = e => {
		if (e.keyCode !== 13) return; // 13 = enter
		e.preventDefault();
		e.stopPropagation();
		if (searchRef.current && searchRef.current.ref.current) {
			searchRef.current.ref.current.click();
		}
	};

	useEffect(() => {
		setError(message);
	}, [message]);

	useEffect(() => {
		setError(undefined);
		if (defaultValue !== string) {
			setString(defaultValue);
		}
	}, [defaultValue]);

	const onClick = e => {
		e.preventDefault();
		if (defaultValue && string === '') {
			handleSearch(undefined);
		} else if (string) {
			handleSearch(string);
		}
	};

	return (
		<Form.Input
			className={makeClassName('field-search', className)}
			defaultValue={string}
			action={{ icon: 'search', color: 'blue', onClick, ref: searchRef }}
			input={{ className: 'search', onKeyDown }}
			onChange={(e, { value }) => setString(value)}
			label={label}
			placeholder={placeholder}
			error={error}
			loading={loading}
		/>
	);
};

export default FormSearch;
