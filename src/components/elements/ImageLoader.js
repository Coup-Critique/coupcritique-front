import { makeClassName } from '@/functions';
import usePrevious from '@/hooks/usePrevious';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'semantic-ui-react';

export const noSrc = '/images/picto/circle-question-solid.svg';

const ImageLoader = ({ src, imgRef, defaultSrc = noSrc, className, ...props }) => {
	const ref = useRef();
	const [loading, setLoading] = useState(undefined);
	const [prevSrc] = usePrevious(src);
	const [innerSrc, setInnerSrc] = useState(src);

	useEffect(() => {
		const img = imgRef?.current || ref.current;
		if (img && img.complete) {
			setLoading(false);
		} else if (loading == undefined) {
			setLoading(true);
		}
	}, []);

	useEffect(() => {
		if (!loading !== undefined && prevSrc && prevSrc !== src) {
			setLoading(true);
			setInnerSrc(src);
		}
	}, [src]);

	return (
		<div className="img-wrapper position-relative">
			{loading && <Loader active size="big" />}
			{/* eslint-disable-next-line jsx-a11y/alt-text */}
			<Image
				{...props}
				src={innerSrc}
				ref={imgRef || ref}
				className={makeClassName(className, loading && 'opacity-0')}
				onLoad={e => setLoading(false)}
				onError={e => {
					e.target.onerror = null;
					setInnerSrc(defaultSrc);
					setLoading(false);
				}}
			/>
		</div>
	);
};

export default ImageLoader;
