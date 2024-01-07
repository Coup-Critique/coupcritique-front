import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CommentGroup, Header, Loader } from 'semantic-ui-react';
import useFetch from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import useStoreQuery from '@/hooks/useStoreQuery';
import Comment from '@/components/elements/Comment';
import FormComment from '@/components/forms/FormComment';
import PaginationPrettier from '@/components/PaginationPrettier';

const CommentArea = ({ entity, entityName }) => {
	const user = useSelector(state => state.user);
	const [comments, setComments] = useState([]);
	const [resultComments, loadComments, loadingComments] = useFetch();
	const [addComment, setAddComment] = useState(false);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();
	const [table, page, nbPages, handlePage] = usePager(
		50,
		comments,
		query,
		setQueryParam
	);

	useEffect(() => {
		if (entity.id && !user.loading) {
			loadComments({ url: `comments/${entityName}/${entity.id}` });
		}
	}, [entity.id, user.loading]);

	useEffect(() => {
		if (resultComments && resultComments.success) {
			setComments(resultComments.comments);
		}
	}, [resultComments]);

	const handleAddComment = e => setAddComment(true);

	const handleCancelComment = e => setAddComment(false);

	const handleNewComment = comment => {
		const nextComments = comments.slice();
		nextComments.unshift(comment);
		setComments(nextComments);
		setAddComment(false);
	};

	const handleUpdateComment = (i, comment) => {
		const nextComments = comments.slice();
		if (!comment) {
			nextComments.splice(i, 1);
		} else {
			nextComments[i] = comment;
		}
		setComments(nextComments);
	};

	return (
		<CommentGroup>
			<Header as="h2" dividing>
				Commentaires
			</Header>
			{!!user.token
				&& (addComment ? (
					<FormComment
						baseEntity={entityName}
						entityId={entity.id}
						handleComment={handleNewComment}
						handleCancel={handleCancelComment}
					/>
				) : (
					<Button
						color="blue"
						icon="edit"
						content="Ajouter un commentaire"
						onClick={handleAddComment}
						className="mb-2"
					/>
				))}
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<div id="pagination-scroll-ref">
				{loadingComments ? (
					<Loader active inline="centered" />
				) : table.length > 0 ? (
					table.map((comment, i) => (
						<Comment
							key={i}
							comment={comment}
							baseEntity={entityName}
							handleUpdate={c => handleUpdateComment(i, c)}
						/>
					))
				) : (
					<p>Il n'y aucun commentaire sur cette actualité pour l'instant.</p>
				)}
			</div>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
		</CommentGroup>
	);
};

export default CommentArea;
