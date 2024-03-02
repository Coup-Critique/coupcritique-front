import { makeClassName } from '@/functions';
import usePrevious from '@/hooks/usePrevious';
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'semantic-ui-react';

const ImageLoader = ({ src, imgRef, defaultSrc, className, ...props }) => {
	const ref = useRef();
	const [loading, setLoading] = useState(true);
	const [prevSrc] = usePrevious(src);

	useEffect(() => {
		const img = imgRef?.current || ref.current;
		if (img && img.complete) {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (prevSrc && prevSrc !== src) {
			setLoading(true);
		}
	}, [src]);

	return (
		<div className="position-relative">
			{loading && <Loader active size="big" />}
			{/* eslint-disable-next-line jsx-a11y/alt-text */}
			<img
				{...props}
				src={src}
				ref={imgRef || ref}
				className={makeClassName(className, loading && 'opacity-0')}
				onLoad={e => setLoading(false)}
				onError={e => {
					e.target.onerror = null;
					e.target.src = defaultSrc;
					setLoading(false);
				}}
			/>
		</div>
	);
};

export default ImageLoader;
