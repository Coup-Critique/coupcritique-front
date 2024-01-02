import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/functions';

const Author = ({ entity }) =>
	entity.user ? (
		<Link className="date d-block mb-3" to={`/entity/users/${entity.user.id}`}>
			{!!entity.user && entity.user.username + ' - '}{' '}
			{!!entity.date_creation &&
				formatDate(entity.update_date || entity.date_creation)}
		</Link>
	) : entity.date_creation ? (
		<p className="date mb-3">
			{formatDate(entity.update_date || entity.date_creation)}
		</p>
	) : null;

export default Author;
