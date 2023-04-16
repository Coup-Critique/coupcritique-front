// modules
import React from 'react';
import { FormTextArea } from 'semantic-ui-react';
import PokemonInstance from '@/components/elements/PokemonInstance';

const InstanceField = ({ instance, tier, onChange, message = {}, required, gen }) => (
	<div className="instance-field">
		<PokemonInstance instance={instance} noDescription gen={gen} tier={tier} />
		<FormTextArea
			name="description"
			label="Utilité du Pokémon dans l'équipe"
			onChange={onChange}
			value={instance.description || ''}
			error={message.description}
			required={required}
			minLength="3"
			maxLength="5000"
		/>
	</div>
);

export default InstanceField;
