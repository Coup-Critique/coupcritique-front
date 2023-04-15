// modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Button } from 'semantic-ui-react';
import { formatDate } from '../../../functions';
// components
import PageWrapper from '../../PageWrapper';
import GoBackButton from '../../GoBackButton';
import useFetch from '../../../hooks/useFetch';
import { DELETE } from '../../../constants/methods';
import { useHistory } from 'react-router-dom';
import { addMessage } from '../../../reducers/messages';
import Tag from '../../elements/Tag';
import ScrollReveal from '../../ScrollReveal';
import CommentArea from '../../CommentArea';
import SectionAds from '../../sections/SectionAds';

const defaultGoBack = "/entity/guides/";
const GuideArticle = ({ result }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [guide, setGuide] = useState((result && result.guide) || null);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	useEffect(() => {
		if (result && result.success) {
			setGuide(result.guide);
		}
	}, [result]);

	useEffect(() => {
		if (resultDelete && resultDelete.success) {
			dispatch(addMessage(resultDelete.message, true));
			history.replace(defaultGoBack);
		}
	}, [resultDelete]);

	const handleDelete = e => loadDelete({ url: `guides/${guide.id}`, method: DELETE });

	if (!guide || !guide.id) return null;
	return (
		<PageWrapper
			title={guide.title}
			className="actuality article"
			metadescription={guide.shortDescription}
			metaimage={guide.images.length > 0 && `guides/${guide.images[0]}`}
		>
			<div className="mb-3">
				<GoBackButton defaultUrl={defaultGoBack} />
				{user.is_modo && (
					<>
						<Button
							as={Link}
							to={`/entity/guides/${guide.id}/update`}
							color="blue"
							content="Modifier"
							icon="pencil"
							className=""
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
				{guide.images.length > 0 && (
					<div className="slick-wrapper">
						<Slider
							infinite
							dots
							speed={500}
							slidesToShow={guide.images.length > 1 ? 2 : 1}
							slidesToScroll={1}
							responsive={[
								{
									breakpoint: 576,
									settings: { slidesToShow: 1 },
								},
							]}
						>
							{guide.images.map((path, i) => (
								<div key={i} className="image mb-2">
									<img
										src={`/images/guides/${path}`}
										className="img-fluid"
										alt="Guide"
										// TODO gerer une taille fixe
									/>
								</div>
							))}
						</Slider>
					</div>
				)}
			</ScrollReveal>
			<ScrollReveal animation="zoomIn" earlier>
				{guide.tags.length > 0 && (
					<div className="text-center">
						{guide.tags.map((tag, i) => (
							<Tag key={i} tag={tag} />
						))}
					</div>
				)}
				<p className="date">
					{guide.user.username} - {formatDate(guide.date_creation)}
				</p>
				<div
					className="description framed wysiwyg-result"
					dangerouslySetInnerHTML={{
						__html: guide.parsedDescription || guide.shortDescription,
					}}
				/>
			</ScrollReveal>
			<SectionAds />
			<CommentArea entity={guide} entityName="guide" />
		</PageWrapper>
	);
};
export default GuideArticle;
