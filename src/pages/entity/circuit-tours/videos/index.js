// module
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Form, Loader } from 'semantic-ui-react';
import useFetch, { manageFetch } from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import Video from '@/components/elements/Video';
import FormVideo from '@/components/forms/FormVideo';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import { objectToGETparams } from '@/functions';
import SectionAds from '@/components/sections/SectionAds';

const VideoList = props => {
	const { tags, authors } = props;
	const user = useSelector(state => state.user);
	const [result, load, loading] = useFetch();
	const [videos, setVideos] = useState(props.videos);
	const [selectedAuthor, setSelectedAuthor] = useState();
	const [checkedTags, setCheckedTags] = useState();
	const [table, page, nbPages, handlePage] = usePager(10, videos);
	const [displayForm, setDisplayForm] = useState(false);

	useEffect(() => {
		if (checkedTags || selectedAuthor) {
			handleLoad();
		}
	}, [checkedTags, selectedAuthor]);

	useEffect(() => {
		if (result?.success) setVideos(result.circuitVideos);
	}, [result]);

	const handleLoad = () =>
		load({
			url:
				'circuit-videos' +
				objectToGETparams({
					tags: checkedTags,
					author: selectedAuthor,
				}),
		});

	const handleAddVideo = () => setDisplayForm(true);
	const handleCancel = e => {
		e.preventDefault();
		setDisplayForm(false);
	};
	const handleSubmited = () => {
		setDisplayForm(false);
		handleLoad();
	};

	return (
		<PageWrapper
			title="Liste des Vidéos"
			metadescription="Liste de vidéos sur la stratégie Pokémon qui pourrait vous faire progresser."
			className="video-list"
			action={
				user.is_modo && (
					<Button
						color="blue"
						content="Ajouter une vidéo"
						icon="plus"
						onClick={handleAddVideo}
					/>
				)
			}
		>
			{displayForm && (
				<FormVideo
					handleCancel={handleCancel}
					tags={tags}
					handleSubmited={handleSubmited}
					loadUrl="circuit-videos"
				/>
			)}
			<Form onSubmit={handleLoad} className="mb-4">
				<div className="row">
					<div className="col-12 col-lg-6 d-flex mb-3 mb-lg-0">
						<DropdownMultipleSelectField
							label="Catégories"
							name="tags"
							className="flex-grow-1"
							placeholder="Sélectionner une catégorie"
							options={tags}
							value={checkedTags}
							onChange={(e, { value }) => setCheckedTags(value)}
						/>
					</div>
					<div className="col-12 col-lg-6 d-flex mb-3 mb-lg-0">
						<Form.Field>
							<label>Auteur</label>
							<Dropdown
								clearable
								selection
								label="Auteur"
								placeholder="Sélectionner un auteur"
								options={authors}
								onChange={(e, { value }) => setSelectedAuthor(value)}
							/>
						</Form.Field>
					</div>
				</div>
			</Form>
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
					table.map(video => (
						<Video
							key={video.id}
							video={video}
							tags={tags}
							isAdmin={user.is_modo}
							setDisplayForm={setDisplayForm}
							displayForm={displayForm}
							handleLoad={handleLoad}
						/>
					))
				) : (
					<p>Aucune vidéo disponible.</p>
				)}
			</div>
			<SectionAds className="mt-4" />
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { circuitVideos } = await manageFetch(`circuit-videos`);
		const { tags } = await manageFetch(`video_tags`);
		const { authors } = await manageFetch(`circuit-videos/authors`);
		let options = [{ key: 0, value: null, text: '\u00A0' }];
		if (authors) {
			authors.map((author, index) => {
				options.push({
					key: index + 1,
					value: author.author,
					text: author.author,
				});
			});
		}
		return {
			props: {
				videos: circuitVideos,
				tags,
				authors: options,
			},
		};
	} catch (e) {
		console.error(e);
		return { props: { videos: [] } };
	}
}

export default VideoList;
