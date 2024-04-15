// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import Slider from 'react-slick';
// components
import PageWrapper from '@/components/PageWrapper';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';
import CommentArea from '@/components/CommentArea';
import SectionAds from '@/components/sections/SectionAds';
import Author from '@/components/elements/Author';
import useFetch from '@/hooks/useFetch';
import { DELETE } from '@/constants/methods';
import { addMessage } from '@/reducers/messages';
import { entitiesToEntity } from '@/constants/entities';

const ArticleArticle = props => {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();
	const { article, entityName } = props;
	const defaultGoBack = `/entity/${entityName}/`;
	const singularEntity = entitiesToEntity[entityName];

	useEffect(() => {
		if (resultDelete?.success) {
			dispatch(addMessage(resultDelete.message, true));
			router.replace(defaultGoBack);
		}
	}, [resultDelete]);

	const handleDelete = e =>
		loadDelete({ url: `${entityName}/${article.id}`, method: DELETE });

	const hasImage = article.images?.length > 0;

	if (!article || !article.id) return null;
	return (
		<PageWrapper
			min
			title={article.title}
			className="actuality article"
			metadescription={article.shortDescription}
			metaimage={hasImage && `${entityName}/${article.images[0]}`}
			goingBack={defaultGoBack}
			action={
				user.is_modo && (
					<div>
						<Button
							as={Link}
							href={`/entity/${entityName}/${article.id}/update`}
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
				{hasImage && (
					<div className="slick-wrapper">
						<Slider
							infinite
							dots
							speed={500}
							slidesToShow={article.images.length > 1 ? 2 : 1}
							slidesToScroll={1}
							responsive={[
								{
									breakpoint: 576,
									settings: { slidesToShow: 1 },
								},
							]}
						>
							{article.images.map((path, i) => (
								<div key={i} className="image mb-2">
									<img
										src={`${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${entityName}/${path}`}
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
				{article.tags.length > 0 && (
					<div className="text-center">
						{article.tags.map((tag, i) => (
							<Tag key={i} tag={tag} />
						))}
					</div>
				)}
				<div className="flex justify-content-between">
					<Author entity={article} />
				</div>
				<div
					className="description framed wysiwyg-result mt-1"
					dangerouslySetInnerHTML={{
						__html: article.parsedDescription || article.shortDescription,
					}}
				/>
			</ScrollReveal>
			<SectionAds />
			<CommentArea entity={article} entityName={singularEntity} />
		</PageWrapper>
	);
};
export default ArticleArticle;
