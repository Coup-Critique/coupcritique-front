// modules
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import { DELETE } from '@/constants/methods';
import { formatDate, makeClassName, youtubeEmbedRegex } from '@/functions';
import useFetch from '@/hooks/useFetch';
import ScrollReveal from '@/components/ScrollReveal';
import VideoEmbed from '@/components/elements/VideoEmbed';
import Tag from '@/components/elements/Tag';
import dynamic from 'next/dynamic';

const FormVideo = dynamic(() => import('@/components/forms/FormVideo'), {
	loading: () => <Loader active inline="centered" />,
	ssr: false,
});

const Video = ({
	video,
	tags = [],
	isAdmin = false,
	handleLoad,
	short = false,
	setDisplayForm,
	displayForm,
	loadUrl = 'videos',
}) => {
	const cookie = useSelector(state => state.cookie);
	const [isUpdate, setIsUpdate] = useState(false);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	const youtube_id = useMemo(() => {
		if (!video) return null;
		if (video.youtube_id) return video.youtube_id;
		return video.url.match(youtubeEmbedRegex)?.[1];
	}, [video]);

	useEffect(() => {
		if (resultDelete?.success) {
			handleLoad();
		}
	}, [resultDelete]);

	const handleDelete = () => {
		loadDelete({
			url: `${loadUrl}/${video.id}`,
			method: DELETE,
		});
	};

	const handleCancel = e => {
		e.preventDefault();
		setIsUpdate(false);
	};
	const handleSubmited = () => {
		setIsUpdate(false);
		handleLoad();
	};
	const handleIsUpdate = update => {
		setIsUpdate(update);
		setDisplayForm(false);
	};

	if (!video) return null;
	if (isUpdate && !displayForm) {
		return (
			<FormVideo
				video={video}
				handleSubmited={handleSubmited}
				handleCancel={handleCancel}
				tags={tags}
				loadUrl={loadUrl}
			/>
		);
	}
	return (
		<ScrollReveal
			className={makeClassName('video', short ? 'short mb-3' : 'mb-5')}
			animation="zoomIn"
			earlier
		>
			<div className="row mb-3">
				<div className={`col-12 col-${short ? 'xl' : 'lg'}-6`}>
					<VideoEmbed youtube_id={youtube_id} cookie={cookie.youtube} />
				</div>
				<div className={`col-12 col-${short ? 'xl' : 'lg'}-6`}>
					<h4>
						<a
							href={`https://www.youtube.com/watch?v=${youtube_id}`}
							target="_blank"
							rel="nofollow noreferrer"
						>
							{video.title}
						</a>
					</h4>
					<h5>
						{video.author} - {formatDate(video.date_creation)}
					</h5>
					{!short && <p className="description">{video.description}</p>}
				</div>
			</div>
			<div className="d-flex align-items-center">
				{video.tags.map((tag, i) => (
					<Tag key={i} tag={tag} />
				))}
				{isAdmin &&
					(loadingDelete ? (
						<Loader inline="centered" active size="tiny" />
					) : (
						<>
							<Button
								color="blue"
								content={'Modifier'}
								icon="pencil"
								onClick={() => handleIsUpdate(true)}
								className="ml-3 mr-2"
							/>
							<Button
								color="red"
								content={'Supprimer'}
								icon="trash"
								onClick={handleDelete}
							/>
						</>
					))}
			</div>
		</ScrollReveal>
	);
};
export default Video;
