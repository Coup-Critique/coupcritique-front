// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button, Loader } from 'semantic-ui-react';
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
import { formatPrices } from '@/functions';

const Slider = dynamic(() => import('react-slick'), {
	loading: () => <Loader active inline="centered" />,
	ssr: false,
});

const ArticleArticle = props => {
	const { article, entityName, link, path = entityName, actions, children } = props;
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();
	const defaultGoBack = `/entity/${path}/`;
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
				<div>
					{user.is_modo && (
						<>
							<Button
								as={Link}
								href={`/entity/${path}/${article.id}/update`}
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
								className="mr-2"
							/>
						</>
					)}
					{actions}
				</div>
			}
		>
			<ScrollReveal animation="zoomIn" earlier>
				{hasImage &&
					(article.images > 2 ? (
						<div className="slick-wrapper">
							{article.images.map((path, i) => (
								<ArticleImage
									key={i}
									entityName={entityName}
									path={path}
								/>
							))}
						</div>
					) : (
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
									<ArticleImage
										key={i}
										entityName={entityName}
										path={path}
									/>
								))}
							</Slider>
						</div>
					))}
			</ScrollReveal>
			<ScrollReveal animation="zoomIn" earlier>
				{article.tags.length > 0 && (
					<div className="text-center">
						{article.tags.map((tag, i) => (
							<Tag key={i} tag={tag} />
						))}
					</div>
				)}
				<div className={link ? 'd-flex justify-content-between' : undefined}>
					{!!link && (
						<p className="date mb-2">
							<Link {...link} />
						</p>
					)}
					<Author entity={article} />
				</div>
				<div className="description framed wysiwyg-result mt-1">
					{article.cashprize ? (
						<div
							className="text-orange font-italic font-weight-bold text-right"
							style={{ marginTop: '-1.5em', marginBottom: '1.5em' }}
						>
							Cash prize&nbsp;: {formatPrices(article.cashprize)}
						</div>
					) : null}
					<div
						dangerouslySetInnerHTML={{
							__html: article.parsedDescription || article.shortDescription,
						}}
					/>
				</div>
			</ScrollReveal>
			{children}
			<SectionAds />
			<CommentArea entity={article} entityName={singularEntity} />
		</PageWrapper>
	);
};

const ArticleImage = ({ entityName, path }) => (
	<div className="image mb-2">
		<img
			src={`${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${entityName}/${path}`}
			className="img-fluid"
			alt="Illustration de l'Actualité"
			// TODO gerer une taille fixe
		/>
	</div>
);

export default ArticleArticle;
