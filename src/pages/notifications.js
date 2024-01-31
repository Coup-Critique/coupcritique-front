import { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
//
import Notification from '@/components/elements/Notification';
import SectionAds from '@/components/sections/SectionAds';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import usePager from '@/hooks/usePager';
import useFetch from '@/hooks/useFetch';
import { setNotifAction } from '@/reducers/notifs';
import Page404 from './404';

const NotificationList = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [result, load, loading] = useFetch();
	const [resultPast, loadPast, loadingPast] = useFetch();
	const [notifications, setNotifications] = useState([]);
	const [pastNotifs, setPastNotifs] = useState([]);
	const [table, page, nbPages, handlePage] = usePager(20, pastNotifs);

	useEffect(() => {
		if (!user.loading) {
			load({ url: 'notifications' });
			loadPast({ url: 'notifications/viewed' });
		}
	}, [user, user.loading]);

	useEffect(() => {
		if (result?.success) {
			setNotifications(result.notifications);
			dispatch(setNotifAction(result.count));
		}
	}, [result]);

	useEffect(() => {
		if (resultPast?.success) {
			setPastNotifs(resultPast.notifications);
		}
	}, [resultPast]);

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id) {
		return <Page404 />;
	}
	return (
		<PageWrapper title="Vos notifications">
			{user.loading || loading ? (
				<Loader active inline="centered" />
			) : notifications.length ? (
				<div className="list-notification">
					{notifications.map(notification => (
						<Notification key={notification.id} notification={notification} />
					))}
				</div>
			) : (
				<p>Vous n'avez aucune nouvelle notification.</p>
			)}
			<SectionAds className="mt-4" />
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<div id="pagination-scroll-ref">
				{loadingPast ? (
					<Loader active inline="centered" />
				) : (
					table.length > 0 && (
						<>
							<h3>Vos anciennes notifications</h3>
							<div className="list-notification">
								{table.map(notification => (
									<Notification
										key={notification.id}
										notification={notification}
									/>
								))}
							</div>
						</>
					)
				)}
			</div>
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

export default NotificationList;
