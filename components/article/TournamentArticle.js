// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Slider from 'react-slick';
import { Button } from 'semantic-ui-react';
import { formatDate } from '@/functions';
// components
import PageWrapper from '@/components/PageWrapper';
import useFetch from '@/hooks/useFetch';
import { DELETE } from '@/constants/methods';
import { useRouter } from 'next/navigation';
import { addMessage } from '@/reducers/messages';
import ScrollReveal from '@/components/ScrollReveal';
import CommentArea from '@/components/CommentArea';
import Tag from '@/components/elements/Tag';
import SectionAds from '@/components/sections/SectionAds';

const defaultGoBack = '/entity/tournaments/';
const TournamentArticle = props => {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();
	const { tournament } = props;

	// TODO composant
	useEffect(() => {
		if (resultDelete?.success) {
			dispatch(addMessage(resultDelete.message, true));
			router.replace(defaultGoBack);
		}
	}, [resultDelete]);

	const handleDelete = e =>
		loadDelete({ url: `tournaments/${tournament.id}`, method: DELETE });

	if (!tournament || !tournament.id) return null;
	return (
		<PageWrapper
			min
			title={tournament.title}
			className="actuality article"
			metadescription={tournament.shortDescription}
			metaimage={
				tournament.images.length > 0 && `tournaments/${tournament.images[0]}`
			}
			goingBack={defaultGoBack}
			action={
				user.is_modo && (
					<div>
						<Button
							as={Link}
							href={`/entity/tournaments/${tournament.id}/update`}
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
					</div>
				)
			}
		>
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
										src={`${process.env.NEXT_PUBLIC_API_URL}/images/uploads/tournaments/${path}`}
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
