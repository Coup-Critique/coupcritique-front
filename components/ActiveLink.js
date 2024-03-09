import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { makeClassName } from '@/functions';
import { useMemo } from 'react';

const ActiveLink = ({ children, className, href, exact = false, ...props }) => {
	const pathname = usePathname();

	const active = useMemo(() => {
		if (exact) {
			return pathname === href;
		}
		return pathname.startsWith(href);
	}, [pathname, href, exact]);

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
