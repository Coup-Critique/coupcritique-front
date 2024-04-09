import { useEffect, useState } from 'react';

const sliceTable = (table, page, limit) => {
	const pageIndex = (page - 1) * limit;
	return table.slice(pageIndex, pageIndex + limit);
};

const defaultArray = [];
const usePager = (limit, fullTable, query, setQueryParam = null) => {
	const defaultPage = (query && query.page) || 1;
	const [table, setTable] = useState(
		fullTable ? sliceTable(fullTable, defaultPage, limit) : defaultArray
	);
	const [nbPages, setNbPages] = useState(0);
	const [page, setPage] = useState(defaultPage);

	useEffect(() => {
		// check if given page from URL doesn't exceed nbPages
		const nbPages = Math.ceil(fullTable.length / limit);
		let activePage = page;
		if (activePage > nbPages) {
			activePage = nbPages || 1;
			setPage(activePage);
			if (query && query.page && setQueryParam) {
				setQueryParam('page', activePage);
			}
		}
		setTable(sliceTable(fullTable, activePage, limit));
		setNbPages(nbPages);
	}, [fullTable]);

	useEffect(() => {
		setPage(defaultPage);
	}, [defaultPage]);

	const handlePage = (e, { activePage }) => {
		// reset scroll
		const scrollRef = document.getElementById('pagination-scroll-ref');
		if (scrollRef && window.scrollY > scrollRef.offsetTop) {
			scrollRef.scrollIntoView({ behavior: 'instant' });
		}

		setTable(sliceTable(fullTable, activePage, limit));
		setPage(activePage);
		if (query && query.page) {
			setQueryParam('page', activePage);
		}
	};

	return [table, page, nbPages, handlePage];
};

export default usePager;
