// modules
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
//
import GoBackButton from '@/components/GoBackButton';
import PageWrapper from '@/components/PageWrapper';
import TableTeam from '@/components/table/TableTeam';
import SectionAds from '@/components/sections/SectionAds';
import useTableFetch from '@/hooks/useTableFetch';
import Page404 from '@/pages/404';

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

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id) {
		return <Page404 />;
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
