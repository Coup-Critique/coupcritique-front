// modules
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import { DELETE } from '@/constants/methods';
import { formatDate, makeClassName } from '@/functions';
import useFetch from '@/hooks/useFetch';
import FormVideo from '@/components/forms/FormVideo';
import ScrollReveal from '@/components/ScrollReveal';
import VideoEmbed from '@/components/elements/VideoEmbed';
import Tag from '@/components/elements/Tag';

const Video = ({
	video,
	tags = [],
	isAdmin = false,
	handleLoad,
	short = false,
	setDisplayForm,
	displayForm,
}) => {
	const cookie = useSelector(state => state.cookie);
	const [isUpdate, setIsUpdate] = useState(false);
	const [wait, setWait] = useState(true);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();

	useEffect(() => {
		setWait(false);
	}, []);

	useEffect(() => {
		if (resultDelete?.success) {
			handleLoad();
		}
	}, [resultDelete]);

	const handleDelete = () => {
		loadDelete({
			url: `videos/${video.id}`,
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
			/>
		);
	}
	return (
		<ScrollReveal
			className={makeClassName('video row', short && 'short')}
			animation="zoomIn"
			earlier
		>
			<div className="col-12 col-lg-6 mb-4">
				{!wait && <VideoEmbed url={video.url} cookie={cookie.youtube} />}
			</div>
			<div className="col-12 col-lg-6 mb-4">
				<h4>
					<a href={video.url} target="_blank" rel="nofollow noreferrer">
						{video.title}
					</a>
				</h4>
				<h5>
					{video.author} - {formatDate(video.date_creation)}
				</h5>
				{!short && <p className="description">{video.description}</p>}
				{video.tags.map((tag, i) => (
					<Tag key={i} tag={tag} />
				))}
				{isAdmin &&
					(loadingDelete ? (
						<Loader inline="centered" active size="tiny" />
					) : (
						<div>
							<Button
								color="blue"
								content={'Modifier'}
								icon="pencil"
								onClick={() => handleIsUpdate(true)}
								className="mr-2"
							/>
							<Button
								color="red"
								content={'Supprimer'}
								icon="trash"
								onClick={handleDelete}
							/>
						</div>
					))}
			</div>
		</ScrollReveal>
	);
};
export default Video;
