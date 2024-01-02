// modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Button } from 'semantic-ui-react';
import { formatDate } from '@/functions';
// components
import PageWrapper from '@/components/PageWrapper';
import GoBackButton from '@/components/GoBackButton';
import useFetch from '@/hooks/useFetch';
import { DELETE } from '@/constants/methods';
import { useHistory } from 'react-router-dom';
import { addMessage } from '@/reducers/messages';
import ScrollReveal from '@/components/ScrollReveal';
import CommentArea from '@/components/CommentArea';
import Tag from '@/components/elements/Tag';
import SectionAds from '@/components/sections/SectionAds';

const defaultGoBack = '/entity/tournaments/';
const TournamentArticle = ({ result }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [tournament, setTournament] = useState(
		result && result.tournament && result.tournament.id ? result.tournament : null
	);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	useEffect(() => {
		if (result && result.tournament && result.tournament.id) {
			setTournament(result.tournament);
		}
	}, [result]);

	useEffect(() => {
		if (resultDelete && resultDelete.success) {
			dispatch(addMessage(resultDelete.message, true));
			history.replace(defaultGoBack);
		}
	}, [resultDelete]);

	const handleDelete = e =>
		loadDelete({ url: `tournaments/${tournament.id}`, method: DELETE });

	if (!tournament) return null;
	return (
		<PageWrapper
			title={tournament.title}
			className="actuality article"
			metadescription={tournament.shortDescription}
			metaimage={
				tournament.images.length > 0 && `tournaments/${tournament.images[0]}`
			}
		>
			<div className="mb-3">
				<GoBackButton defaultUrl={defaultGoBack} />
				{user.is_modo && (
					<>
						<Button
							as={Link}
							to={`/entity/tournaments/${tournament.id}/update`}
							color="blue"
							content="Modifier"
							icon="pencil"
							className="mr-2"
						/>
						<Button
							loading={loadingDelete}
							onClick={handleDelete}
							color="red"
							content="Supprimer"
							icon="trash alternate"
						/>
					</>
				)}
			</div>
			<ScrollReveal animation="zoomIn" earlier>
				{tournament.images.length > 0 && (
					<div className="slick-wrapper">
						<Slider
							infinite
							dots
							speed={500}
							slidesToShow={tournament.images.length > 1 ? 2 : 1}
							slidesToScroll={1}
							responsive={[
								{
									breakpoint: 576,
									settings: { slidesToShow: 1 },
								},
							]}
						>
							{tournament.images.map((path, i) => (
								<div key={i} className="image mb-2">
									<img
										src={`/images/tournaments/${path}`}
										className="img-fluid"
										alt="Tournoi"
										// TODO gerer une taille fixe
									/>
								</div>
							))}
						</Slider>
					</div>
				)}
			</ScrollReveal>
			<ScrollReveal animation="zoomIn" earlier>
				{tournament.tags.length > 0 && (
					<div className="text-center">
						{tournament.tags.map((tag, i) => (
							<Tag key={i} tag={tag} />
						))}
					</div>
				)}
				{/* not display the author */}
				<p className="date">{formatDate(tournament.date_creation)}</p>
				<div
					className="description framed wysiwyg-result"
					dangerouslySetInnerHTML={{
						__html:
							tournament.parsedDescription || tournament.shortDescription,
					}}
				/>
			</ScrollReveal>
			<SectionAds />
			<CommentArea entity={tournament} entityName="tournament" />
		</PageWrapper>
	);
};
export default TournamentArticle;
