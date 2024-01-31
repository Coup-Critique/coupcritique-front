// modules
import { Label, Popup } from 'semantic-ui-react';

const HistoryPopup = ({ history }) =>
	!!history && (
		<Popup
			position="left center"
			content={
				<div
					dangerouslySetInnerHTML={{
						__html: history,
					}}
				/>
			}
			trigger={
				<Label
					icon="history"
					color="blue"
					size="large"
					className="rounded icon action-icon"
					title="historique"
				/>
			}
		/>
	);
export default HistoryPopup;
