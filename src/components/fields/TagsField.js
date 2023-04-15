// modules
import React from 'react';
import { useSelector } from 'react-redux';
import { Icon, Label, FormField, Message } from 'semantic-ui-react';
import { makeClassName } from '../../functions';

const TagsField = ({
	label = 'Catégories\u00A0:',
	name = 'tags',
	handleChange,
	message,
	tags,
}) => {
	const user = useSelector(state => state.user);

	// TODO : remplacer index par id => peut etre pas finalement
	const toggleTag = i => {
		const nextTags = tags.slice();
		nextTags[i] = { ...tags[i], selected: !tags[i].selected };
		handleChange(
			name,
			nextTags.filter(tag => !!tag.selected)
		);
	};

	if (!tags || !tags.length) return null;
	return (
		<FormField className="tags">
			<label>{label}</label>
			{!!message && <Message error content={message} />}
			{tags.map((tag, i) =>
				tag.isModo && !user.is_modo ? null : (
					<Tag key={i} index={i} tag={tag} toggle={toggleTag} />
				)
			)}
		</FormField>
	);
};

const Tag = ({ tag, toggle, index }) => (
	<Label
		onClick={e => toggle(index)}
		color={'grey'}
		className={makeClassName(
			'team-tag',
			tag.selected && 'selected',
			tag.sortOrder === 0 && 'main'
		)}
	>
		<span>{tag.name}</span>
		<Icon name="close" size="mini" />
	</Label>
);

export default TagsField;
