// modules
import React from 'react';
import { Form, Button, Label, Icon } from 'semantic-ui-react';
// constants
import { REPLAY_URL } from '@/constants/index';

// prettier-ignore
export const urlToUri = url => url
    .replace(/^https:\/\/.*\//g, '')
    .match(/[a-zA-Z0-9_-]*/g)
    .join('');

const ReplaysField = ({ name = 'replays', value, message, handleChange }) => {
	const handleReplay = (i, uri) => {
		const replays = value.slice();
		if (replays[i]) {
			replays[i] = { ...replays[i], uri: urlToUri(uri) };
		} else {
			replays[i] = { uri: urlToUri(uri) };
		}
		handleChange(name, replays);
	};

	const addReplay = e => {
		e.preventDefault();
		if (value.length > 4) return;
		const replays = value.slice();
		replays.push(null);
		handleChange(name, replays);
	};

	const removeReplay = (e, i) => {
		e.preventDefault();
		const replays = value.slice();
		replays.splice(i, 1);
		handleChange(name, replays);
	};

	return (
		<Form.Field>
			<label>Replays</label>
			{value.map((replay, i) => (
				<Form.Input
					key={i}
					name="replay"
					placeholder="coller une url"
					onChange={(e, { value }) => handleReplay(i, value)}
					// error={messages[i]}
					labelPosition="left"
					value={replay ? replay.uri : ''}
					error={message}
				>
					<Label onClick={removeReplay}>
						<Icon name="trash" color="red" link />
					</Label>
					<Label className="input-ui-label-text d-none d-xs-block">
						{REPLAY_URL}
					</Label>
					<input />
				</Form.Input>
			))}
			<Button
				icon="plus"
				content="Ajouter un replay"
				color="blue"
				onClick={addReplay}
				disabled={value.length > 4}
			/>
		</Form.Field>
	);
};

export default ReplaysField;
