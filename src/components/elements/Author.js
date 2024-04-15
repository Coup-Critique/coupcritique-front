import Link from 'next/link';
import { formatDate } from '@/functions';

const Author = ({ entity }) =>
	entity.startDate ? (
		<p className="date mb-2">
			<Dates entity={entity} />
		</p>
	) : entity.user ? (
		<Link className="date d-block mb-2" href={`/entity/users/${entity.user.id}`}>
			{!!entity.user && entity.user.username + ' - '}{' '}
			{!!entity.date_creation &&
				formatDate(entity.update_date || entity.date_creation)}
		</Link>
	) : entity.date_creation ? (
		<p className="date mb-2">
			{formatDate(entity.update_date || entity.date_creation)}
		</p>
	) : null;

const Dates = ({ entity }) => (
	<span>
		Du {formatDate(entity.startDate)} au {formatDate(entity.endDate)}
	</span>
);

export default Author;
