import { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* eslint-disable default-case */
const useClick = to => {
	const history = useHistory();
	const [stopClick, setStopClick] = useState(false);

	const handleClick = e => {
		if (stopClick) return;
		if (
			e.target.localName === 'a'
			|| e.target.localName === 'i'
			|| e.target.localName === 'button'
			|| e.target.localName === 'input'
			|| e.target.localName === 'label'
			|| e.target.classList.contains('link')
			|| e.target.classList.contains('action-icon')
			|| e.target.classList.contains('td-action')
		) {
			return null;
		}
		if (e.ctrlKey) {
			window.open(to, '_blank');
		} else {
			history.push(to);
		}
	};

	return [handleClick, setStopClick];
};
export default useClick;
