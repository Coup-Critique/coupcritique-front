// modules
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
// custom
import useFetch from '@/hooks/useFetch';
import { PUT } from '@/constants/methods';

const ApproveComment = ({ comment, handleUpdate, baseEntity }) => {
	const user = useSelector(state => state.user);
	const [resultVote, loadVote, loadingVote] = useFetch();

	useEffect(() => {
		if (resultVote) {
			if (resultVote.success) {
				handleUpdate(resultVote.comment);
			}
		}
	}, [resultVote]);

	const handleApprove = e => handleVote(true);
	const handleDisapprove = e => handleVote(false);
	const handleVote = positiv => {
		if (loadingVote) return;
		loadVote({
			url: `comments/${baseEntity}/vote/${comment.id}`,
			method: PUT,
			body: { positiv },
		});
	};

	const makeNumber = (nb = 0) => {
		let nbString = nb.toString();
		if (nb > 999999) {
			nbString = nbString.slice(0, -6) + 'M';
		} else if (nb > 999) {
			nbString = nbString.slice(0, -3) + 'K';
		}
		return nbString;
	};

	const isAuthor = comment.user.id === user.id;

	// Not logged users and authors cannot approve
	return (
		<div className="approval">
			<Icon
				name="sort up"
				link={!!user.token && !isAuthor}
				onClick={!user.token || isAuthor ? undefined : handleApprove}
				title={
					!user.token
						? 'Vous devez être connecté pour utiliser cette action'
						: isAuthor
						? 'Vous ne pouvez pas approuver votre propre commentaire'
						: undefined
				}
				color={
					comment.own_user_vote && comment.own_user_vote.positiv === true
						? 'black'
						: 'grey'
				}
			/>
			<span className="approval-number h3">
				{loadingVote ? (
					<Loader
						active
						inline="centered"
						size="tiny"
						className="d-inline-block"
					/>
				) : (
					makeNumber(comment.approval)
				)}
			</span>
			<Icon
				name="sort down"
				link={!!user.token && !isAuthor}
				onClick={!user.token || isAuthor ? undefined : handleDisapprove}
				title={
					!user.token
						? 'Vous devez être connecté pour utiliser cette action'
						: isAuthor
						? 'Vous ne pouvez pas desapprouver votre propre commentaire'
						: undefined
				}
				color={
					comment.own_user_vote && comment.own_user_vote.positiv === false
						? 'black'
						: 'grey'
				}
			/>
		</div>
	);
};
export default ApproveComment;
