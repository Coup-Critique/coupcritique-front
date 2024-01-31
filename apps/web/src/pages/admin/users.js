// modules
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
//
import useFetch from '@/hooks/useFetch';
import useStoreQuery from '@/hooks/useStoreQuery';
import FormSearch from '@/components/forms/FormSearch';
import PageWrapper from '@/components/PageWrapper';
import TableUser from '@/components/table/TableUser';
import Page404 from '@/pages/404';
// components

const defaultArray = [];
const AdminUsers = () => {
	const user = useSelector(state => state.user);
	const [result, load, loading] = useFetch();
	const [table, setTable] = useState(defaultArray);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		load({ url: 'users/admin' + (query.search ? `?search=${query.search}` : '') });
	}, [query.search]);

	useEffect(() => {
		if (result) {
			if (result.success) {
				setTable(result.users);
			} else {
				setTable(defaultArray);
			}
		}
	}, [result]);

	const handleSearch = search => {
		setQueryParam('search', search);
	};

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
	}
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
