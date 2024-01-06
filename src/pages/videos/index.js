// module
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Form, Loader } from 'semantic-ui-react';
import useFetch from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import Video from '@/components/elements/Video';
import FormVideo from '@/components/forms/FormVideo';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import { setVideoTags } from '@/reducers/video_tags';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import { objectToGETparams } from '@/functions';
import SectionAds from '@/components/sections/SectionAds';

const VideoList = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const video_tags = useSelector(state => state.video_tags);
	const [resultTags, loadTags, loadingTags] = useFetch();
	const [resultAuthors, loadAuthors, loadingAuthors] = useFetch();
	const [result, load, loading] = useFetch();

	const [videos, setVideos] = useState([]);
	const [authors, setAuthors] = useState([]);

	const [selectedAuthor, setSelectedAuthor] = useState();
	const [checkedTags, setCheckedTags] = useState([]);
	const [table, page, nbPages, handlePage] = usePager(10, videos);
	const [displayForm, setDisplayForm] = useState(false);

	useEffect(() => {
		if (!video_tags.length) {
			loadTags({ url: 'video_tags' });
		}
		if (!authors.length) {
			loadAuthors({ url: 'videos/authors' });
		}
	}, []);

	useEffect(() => {
		if (resultAuthors && resultAuthors.success) {
			let parsedAuthors = resultAuthors.authors.map((author, idx) => {
				return {
					key: 'author_' + idx,
					value: author.author,
					text: author.author,
				};
			});
			setAuthors(parsedAuthors);
		}
	}, [resultAuthors]);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			dispatch(setVideoTags(resultTags.tags));
		}
	}, [resultTags]);

	useEffect(() => {
		handleLoad();
	}, []);

	useEffect(() => {
		if (result?.success) setVideos(result.videos);
	}, [result]);

	const handleLoad = () =>
		load({
			url:
				'videos' +
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
		>
			{user.is_modo && (
				<Button
					color="blue"
					content="Ajouter une vidéo"
					icon="plus"
					onClick={handleAddVideo}
					className="mb-4"
				/>
			)}
			{displayForm && (
				<FormVideo
					handleCancel={handleCancel}
					tags={video_tags}
					handleSubmited={handleSubmited}
				/>
			)}

			<Form onSubmit={handleLoad} className="mb-4">
				{loadingTags || loadingAuthors ? (
					<Loader active inline="centered" />
				) : (
					<>
						<DropdownMultipleSelectField
							label="Catégories"
							name="tags"
							className="flex-grow-1"
							options={video_tags}
							value={checkedTags}
							onChange={(e, { value }) => setCheckedTags(value)}
						/>
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
						<Button
							color="orange"
							content="Valider le filtre"
							type="submit"
						/>
					</>
				)}
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
							tags={video_tags}
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

export default VideoList;
