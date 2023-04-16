import React, { useEffect, useRef, useState } from 'react';
import { makeClassName } from '@/functions';

const ScrollReveal = ({
	Tag = 'div',
	className,
	animation,
	earlier = false,
	outterRef,
	...props
}) => {
	const innerRef = useRef(null);
	const ref = outterRef || innerRef;
	const unmounted = useRef(false);
	const [reveal, setReveal] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(130);

	useEffect(() => {
		return () => (unmounted.current = true);
	}, []);

	useEffect(() => {
		if (!unmounted.current && ref.current && !reveal) {
			let headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
			setHeaderHeight(headerHeight);
			if (isInViewport(ref.current, headerHeight)) {
				if (Tag === 'img') {
					if (ref.current.complete) {
						setReveal(true);
					} else {
						ref.current.onload = () => setReveal(true);
					}
				} else {
					setTimeout(() => {
						if (!unmounted.current) {
							setReveal(true);
						}
					}, 200);
				}
			} else {
				document.addEventListener('scroll', handleScroll, { passive: true });
			}
		}
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [ref.current]);

	const handleScroll = e => {
		if (!unmounted.current && isInViewport(ref.current)) {
			setReveal(true);
			document.removeEventListener('scroll', handleScroll);
		}
	};

	function isInViewport(el, cropHeight = headerHeight) {
		const { top, bottom } = el.getBoundingClientRect();
		const viewPortHeight =
			window.innerHeight || document.documentElement.clientHeight;
		return (
			top >= 0
			&& (bottom - top > window.innerHeight || bottom)
				<= (viewPortHeight + cropHeight) * (earlier ? 1.25 : 1)
		);
	}

	return (
		<Tag
			{...props}
			className={makeClassName(
				className,
				reveal ? `visible animate__animated animate__${animation}` : 'invisible'
			)}
			ref={outterRef ? undefined : innerRef}
		/>
	);
};

export default ScrollReveal;
