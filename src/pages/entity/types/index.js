import React from 'react';
import Type from '@/components/elements/Type';

const TypeList = ({ types = [] }) => (
	<div className="list-type">
		{types.map(type => (
			<Type key={type.id} type={type} className="mr-3 mb-2" />
		))}
	</div>
);

export default TypeList;
