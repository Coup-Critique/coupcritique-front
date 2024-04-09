// modules

import { Form, Radio } from 'semantic-ui-react';

const RadioFilterForm = ({ name, label, value, fields, onChange }) => (
	<Form className="radio-filter-form">
		<Form.Group inline>
			{!!label && <label>{label}&nbsp;: </label>}
			{!!fields
				&& fields.map((field, i) => (
					<Form.Field
						key={i}
						name={name}
						control={Radio}
						checked={value === field.value}
						onChange={onChange}
						{...field}
					/>
				))}
		</Form.Group>
	</Form>
);

export default RadioFilterForm;
