import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeClassName } from '@/functions';

const ActiveLink = ({ children, className, href, exact = false, ...props }) => {
	const { asPath, isReady } = useRouter();
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (isReady) {
			const linkPathname = new URL(href, location.href).pathname;
			const activePathname = new URL(asPath, location.href).pathname;
			if (
				exact
					? linkPathname === activePathname
					: activePathname.startsWith(linkPathname)
			) {
				setActive(true);
			}
		}
	}, [isReady, props.href]);

	return (
		<Link
			href={href}
			className={makeClassName(active && 'active', className)}
			{...props}
		>
			{children}
		</Link>
	);
};
export default ActiveLink;
