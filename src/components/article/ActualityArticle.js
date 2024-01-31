// modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import Slider from 'react-slick';
// components
import PageWrapper from '@/components/PageWrapper';
import GoBackButton from '@/components/GoBackButton';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';
import CommentArea from '@/components/CommentArea';
import SectionAds from '@/components/sections/SectionAds';
import Author from '@/components/elements/Author';
import useFetch from '@/hooks/useFetch';
import { DELETE } from '@/constants/methods';
import { addMessage } from '@/reducers/messages';
import useStateProps from '@/hooks/useStateProps';

const defaultGoBack = '/entity/actualities/';
const ActualityArticle = props => {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [actuality, setActuality] = useStateProps(props.actuality || null);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	useEffect(() => {
		if (resultDelete?.success) {
			dispatch(addMessage(resultDelete.message, true));
			router.replace(defaultGoBack);
		}
	}, [resultDelete]);

	const handleDelete = e =>
		loadDelete({ url: `actualities/${actuality.id}`, method: DELETE });

	if (!actuality || !actuality.id) return null;
	return (
		<PageWrapper
			title={actuality.title}
			className="actuality article"
			metadescription={actuality.shortDescription}
			metaimage={
				actuality.images.length > 0 && `actualities/${actuality.images[0]}`
			}
		>
			<div className="mb-3">
				<GoBackButton defaultUrl="/entity/actualities" />
				{user.is_modo && (
					<>
						<Button
							as={Link}
							href={`/entity/actualities/${actuality.id}/update`}
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
				{actuality.images.length > 0 && (
					<div className="slick-wrapper">
						<Slider
							infinite
							dots
							speed={500}
							slidesToShow={actuality.images.length > 1 ? 2 : 1}
							slidesToScroll={1}
							responsive={[
								{
									breakpoint: 576,
									settings: { slidesToShow: 1 },
								},
							]}
						>
							{actuality.images.map((path, i) => (
								<div key={i} className="image mb-2">
									<img
										src={`/images/actualities/${path}`}
										className="img-fluid"
										alt="Actualité"
										// TODO gerer une taille fixe
									/>
								</div>
							))}
						</Slider>
					</div>
				)}
			</ScrollReveal>
			<ScrollReveal animation="zoomIn" earlier>
				{actuality.tags.length > 0 && (
					<div className="text-center">
						{actuality.tags.map((tag, i) => (
							<Tag key={i} tag={tag} />
						))}
					</div>
				)}
				<Author entity={actuality} />
				<div
					className="description framed wysiwyg-result"
					dangerouslySetInnerHTML={{
						__html: actuality.parsedDescription || actuality.shortDescription,
					}}
				/>
			</ScrollReveal>
			<SectionAds />
			<CommentArea entity={actuality} entityName="actuality" />
		</PageWrapper>
	);
};
export default ActualityArticle;
