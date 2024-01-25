// modules
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Form,
	Button,
	Message,
	Comment as SemanticComment,
	Icon,
} from 'semantic-ui-react';
import { POST, PUT } from '@/constants/methods';
import { buildFieldsMessage } from '@/functions';
import { formatDate } from '@/functions';
import useFetch from '@/hooks/useFetch';
import Comment from '@/components/elements/Comment';
import Profile from '@/components/elements/Profile';

// don't keep useless datas
const clearComment = ({ id, content, date_creation }) => ({ id, content, date_creation });

const FormComment = ({
	handleComment,
	handleCancel,
	commentGiven = {},
	isReply,
	baseEntity,
	entityId,
}) => {
	const user = useSelector(state => state.user);
	const [comment, setComment] = useState(clearComment(commentGiven));
	const [result, load, loading] = useFetch();
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (result) {
			setSuccess(result.success);
			if (result.success) {
				handleComment(result.comment);
			} else if (result.errors) {
				setMessage(buildFieldsMessage(result.errors));
			} else if (result.message) {
				setMessage({ form: result.message });
			}
		}
	}, [result]);

	const handleChange = (e, { name, value }) => {
		setComment({ ...comment, [name]: value });
	};

	const handleSubmit = e => {
		if (commentGiven.id) {
			load({
				url: `comments/${baseEntity}/comment/${commentGiven.id}`,
				method: PUT,
				body: comment,
			});
		} else {
			load({
				url: `comments/${baseEntity}${isReply ? '/reply' : ''}/${entityId}`,
				method: POST,
				body: comment,
			});
		}
	};

	return (
		<SemanticComment>
			<div className="d-flex">
				<Profile className="avatar" user={user} hideName width={65} height={65} />
				<SemanticComment.Content className="flex-grow-1">
					<SemanticComment.Author as="span">
						{user.username}
					</SemanticComment.Author>
					{!!comment.date_creation && (
						<SemanticComment.Metadata>
							{formatDate(comment.date_creation)}
						</SemanticComment.Metadata>
					)}
					<SemanticComment.Metadata>
						<Icon name="x" link onClick={handleCancel} />
					</SemanticComment.Metadata>
					<Form
						onSubmit={handleSubmit}
						loading={loading}
						error={!success}
						success={success}
					>
						<Form.TextArea
							className="text"
							rows="4"
							maxLength="3000"
							name="content"
							onChange={handleChange}
							value={comment.content || ''}
							error={message.content}
						/>
						<Message success content={message.form} className="text" />
						<Message error content={message.form} className="text" />
						<Button content="Valider" icon="check" color="green" />
					</Form>
				</SemanticComment.Content>
			</div>
			{!!commentGiven.replies && commentGiven.replies.length > 0 && (
				<SemanticComment.Group>
					{commentGiven.replies.map((reply, i) => (
						<Comment
							key={i}
							comment={reply}
							isReply
							baseEntity={baseEntity}
						/>
					))}
				</SemanticComment.Group>
			)}
		</SemanticComment>
	);
};

export default FormComment;
