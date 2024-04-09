'use client';
import { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper';
import useLogout from '@/hooks/useLogout';

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	const router = useRouter();
	const logout = useLogout();

	const handleRefresh = () => {
		reset();
	};

	const handleGoBack = () => {
		// reset();
		router.back();
	};

	const handleLogout = () => {
		// reset();
		logout();
	};

	return (
		<PageWrapper title="Une erreur est survenue">
			<p>
				Nous sommes désolé pour le désagrément, une erreur est venue corrompre
				votre interface.
				<br /> Nous faisons notre maximum pour la corriger au plus vite.
				<br /> Vous pouvez essayer de rafraîchir la page, si le problème persiste
				veuillez nous contacter par{' '}
				<a
					href="https://discord.gg/UNn4Se3ZKM"
					target="_blank"
					rel="noreferrer nofollow"
				>
					discord
				</a>{' '}
				ou par mail&nbsp;: <b>aide.coupcritique@gmail.com</b>.
			</p>
			<div className="mb-1_5">
				<p>Pour tenter de résoudre le problème :</p>
				<Button
					color="orange"
					onClick={handleRefresh}
					icon="refresh"
					content="Rafraîchir la page"
				/>
			</div>
			<div className="mb-1_5">
				<p>Pour effectuer d'autres actions :</p>
				<Button
					color="orange"
					onClick={handleGoBack}
					icon="left arrow"
					basic
					content="Revenir en lieu sûr"
				/>
			</div>
			<div>
				<p>Si vous parvenez pas rétablir l'interface :</p>
				<Button
					color="red"
					onClick={handleLogout}
					icon="sign out"
					basic
					size="mini"
					content="Se déconnecter"
				/>
			</div>
		</PageWrapper>
	);
}
