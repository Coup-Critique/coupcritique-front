// modules
import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { objectToGETparams } from '@/functions';
import useFetch from '@/hooks/useFetch';
import useStoreQuery from '@/hooks/useStoreQuery';
import FormSearch from '@/components/forms/FormSearch';
import PageWrapper from '../../PageWrapper';
import TableUser from '@/components/table/TableUser';
// components

const AdminUsers = () => {
	const [result, load, loading] = useFetch();
	const [table, setTable] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		load({ url: 'users/admin' + (query.search ? `?search=${query.search}` : '') });
	}, [query.search]);

	useEffect(() => {
		if (result) {
			if (result.success) {
				setTable(result.users);
			} else {
				setTable([]);
			}
		}
	}, [result]);

	const handleSearch = search => {
		setQueryParam('search', search);
	};

	return (
		<PageWrapper title="Utilisateurs" more nofollow>
			<div className="list-filter">
				<FormSearch
					placeholder={'Rechercher'}
					handleSearch={handleSearch}
					defaultValue={query.search}
					// searchRef={searchRef}
				/>
			</div>
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active={loading} inline="centered" />
				) : (
					<TableUser
						users={table}
						setUsers={setTable}
						isModo
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
		</PageWrapper>
	);
};
export default AdminUsers;
