import { useEffect } from 'react';

function useSymfonyMessageTimer() {
	useEffect(() => {
		const messages = document.getElementsByClassName('flash-message-symfony');
		let height = 0;
		if (messages.length) {
			for (let message of messages) {
				message.style.transform = `translateY(${height}px)`;
				height += message.offsetHeight + 15;
			}
			setTimeout(() => {
				for (let message of messages) {
					message.classList.add('d-none');
				}
			}, 3000);
		}
	}, []);
}

export default useSymfonyMessageTimer;
