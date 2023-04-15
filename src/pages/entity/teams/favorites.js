// modules
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Loader } from 'semantic-ui-react';
import GoBackButton from '../../GoBackButton';
import PageWrapper from '../../PageWrapper';
import TableTeam from '../../table/TableTeam';
import SectionAds from '../../sections/SectionAds';
import useTableFetch from '../../../hooks/useTableFetch';

const ListFavoriteTeam = () => {
	const user = useSelector(state => state.user);

	const {
		table,
		setTable,
		loading,
		handleLoad,
		nbPages,
		query,
		handlePage,
		handleSort,
	} = useTableFetch('teams', {
		loadUrl: !user.loading && user.id ? 'teams/favorite' : null,
	});

	useEffect(() => {
		if (!user.loading && user.id) {
			handleLoad();
		}
	}, [user.loading]);

	if (!user.loading && !user.id) {
		return <Redirect to="/" />;
	}

	return (
		<PageWrapper title={'Liste des équipes en favoris'} nofollow more>
			<div className="mb-3">
				<GoBackButton />
			</div>
			<SectionAds />
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active={loading} inline="centered" />
				) : table && table.length > 0 ? (
					<TableTeam
						teams={table}
						setTeams={setTable}
						handleLoad={handleLoad}
						handleSort={handleSort}
						handlePage={handlePage}
						query={query}
						nbPages={nbPages}
					/>
				) : (
					<p>Vous n'avez aucune équipe en favoris.</p>
				)}
			</div>
		</PageWrapper>
	);
};
export default ListFavoriteTeam;
