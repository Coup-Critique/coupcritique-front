// modules
import CircuitVideoList from '../..';
import { manageFetch } from '@/hooks/useFetch';

// TODO ajouter une props tour
const CircuitVideoListByTour = props => <CircuitVideoList {...props} />;

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

export default CircuitVideoListByTour;
