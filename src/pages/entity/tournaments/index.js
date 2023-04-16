// modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
// components
import useDarkMode from '@/hooks/useDarkMode';
import useFetch from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import TournamentTeaser from '@/components/elements/TournamentTeaser';
import PageWrapper from '../../PageWrapper';
import PaginationPrettier from '../../PaginationPrettier';
import SectionAds from '@/components/sections/SectionAds';

const TournamentList = () => {
	const { user, ssrData } = useSelector(state => state);
	const [darkMode] = useDarkMode();
	const [result, load, loading] = useFetch();
	const [tournaments, setTournaments] = useState(ssrData?.tournaments || []);
	const [table, page, nbPages, handlePage] = usePager(12, tournaments);

	useEffect(() => {
		if (!tournaments.length /*  || Object.keys(query).length > 1 */) {
			handleLoad();
		}
		// }, [query.tags]);
	}, []);

	useEffect(() => {
		if (result && result.success) setTournaments(result.tournaments);
	}, [result]);

	const handleLoad = () => load({ url: 'tournaments' });

	return (
		<PageWrapper
			title="Tous les tournois Pokémon"
			className="actuality-list"
			metadescription="Liste des tournois Pokémon de la scène compétitive française et internationale."
		>
			{user.is_modo && (
				<Button
					as={Link}
					to="/entity/tournaments/create"
					color="blue"
					content="Ajouter un tournoi"
					icon="plus"
					className="mb-4"
				/>
			)}
			<SectionAds />
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader inline="centered" active />
				) : table.length > 0 ? (
					<div className="row">
						{table.map(tournament => (
							<div
								key={tournament.id}
								className="col-12 col-lg-4 d-flex flex-column"
							>
								<TournamentTeaser
									tournament={tournament}
									darkMode={darkMode}
								/>
							</div>
						))}
					</div>
				) : (
					<p>Aucun tournoi disponible.</p>
				)}
			</div>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<SectionAds />
		</PageWrapper>
	);
};

export default TournamentList;
