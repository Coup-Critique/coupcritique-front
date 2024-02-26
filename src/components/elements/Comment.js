// modules
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import Link from 'next/link';
import { Comment as SemanticComment, Icon } from 'semantic-ui-react';
// custom
import Profile, { ProfileBadge } from '@/components/elements/Profile';
import FormComment from '@/components/forms/FormComment';
import ApproveComment from '@/components/actions/ApproveComment';
import { formatDate } from '@/functions';
import DeleteAction from '@/components/actions/DeleteAction';

const Comment = ({ comment, isReply = false, handleUpdate, baseEntity }) => {
	const user = useSelector(state => state.user);
	const [addReply, setAddReply] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [see, setSee] = useState(false);

	const handleAddReply = e => setAddReply(true);
	const handleCancelReply = e => setAddReply(false);
	const handleUpdating = e => setUpdating(true);
	const handleCancel = e => setUpdating(false);
	const toggleSee = e => setSee(!see);

	const handleUpdateBuffer = comment => {
		handleUpdate(comment);
		setUpdating(false);
	};

	const handleReply = reply => {
		const nextReplies = comment.replies.slice();
		nextReplies.push(reply);
		handleUpdate({ ...comment, replies: nextReplies });
		setAddReply(false);
	};

	const handleUpdateReply = (i, reply) => {
		const nextReplies = comment.replies.slice();
		if (!reply) {
			nextReplies.splice(i, 1);
		} else {
			nextReplies[i] = reply;
		}
		handleUpdate({ ...comment, replies: nextReplies });
	};

	if (updating) {
		return (
			<FormComment
				baseEntity={baseEntity}
				commentGiven={comment}
				entityId={comment.id}
				isReply={isReply}
				handleComment={handleUpdateBuffer}
				handleCancel={handleCancel}
			/>
		);
	}

	const isAuthor = comment.user.id === user.id;

	return (
		<SemanticComment className="clearfix d-flex">
			{!isReply && !comment.deleted && (
				<ApproveComment
					comment={comment}
					baseEntity={baseEntity}
					handleUpdate={handleUpdate}
				/>
			)}
			<div className="flex-grow-1">
				<div className="d-flex">
					<Profile
						className="avatar"
						user={comment.user}
						hideName
						width={65}
						height={65}
					/>
					<SemanticComment.Content className="clearfix flex-grow-1">
						<SemanticComment.Author
							as="a"
							href={`/entity/users/${comment.user.id}`}
						>
							{comment.user.username}
						</SemanticComment.Author>
						<SemanticComment.Metadata>
							{formatDate(comment.date_creation)}
						</SemanticComment.Metadata>
						{comment.deleted ? (
							<>
								{user.is_modo === true && (
									<SemanticComment.Metadata>
										<DeleteAction
											isIcon
											url={`comments/${baseEntity}/comment/${comment.id}`}
											callback={result =>
												handleUpdate(result.comment)
											}
										/>
										<Icon
											link
											name="eye"
											title="voir"
											onClick={toggleSee}
										/>
									</SemanticComment.Metadata>
								)}
								<SemanticComment.Text className="font-italic">
									{see
										? comment.content
										: 'Ce commentaire a été supprimé'}
								</SemanticComment.Text>
							</>
						) : (
							<>
								<SemanticComment.Metadata>
									{isAuthor && !!handleUpdate && (
										<Icon
											link
											name="pencil"
											onClick={handleUpdating}
											title="modifier"
										/>
									)}
									{((isAuthor && !!handleUpdate) || user.is_modo) && (
										<DeleteAction
											isIcon
											url={`comments/${baseEntity}/comment/${comment.id}`}
											callback={result =>
												handleUpdate(result.comment)
											}
										/>
									)}
								</SemanticComment.Metadata>
								<SemanticComment.Text>
									{comment.content}
								</SemanticComment.Text>
								{!isReply && !!user.id && (
									<SemanticComment.Actions>
										<SemanticComment.Action onClick={handleAddReply}>
											Répondre
										</SemanticComment.Action>
									</SemanticComment.Actions>
								)}
							</>
						)}
					</SemanticComment.Content>
				</div>
				{((!!comment.replies && comment.replies.length > 0) || addReply) && (
					<SemanticComment.Group>
						{comment.replies.map((reply, i) => (
							<Comment
								key={i}
								comment={reply}
								isReply
								baseEntity={baseEntity}
								handleUpdate={r => handleUpdateReply(i, r)}
							/>
						))}
						{addReply && (
							<FormComment
								isReply={true}
								baseEntity={baseEntity}
								entityId={comment.id}
								handleComment={handleReply}
								handleCancel={handleCancelReply}
							/>
						)}
					</SemanticComment.Group>
				)}
			</div>
		</SemanticComment>
	);
};
export default Comment;
