'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// components
import { manageFetch } from '@/hooks/useFetch';
import useLocalStorage from '@/hooks/useLocalStorage';
import FormTeam from '@/components/forms/FormTeam';
import PageWrapper from '@/components/PageWrapper';
import SignPanel from '@/components/SignPanel';
import GoBackButton from '@/components/GoBackButton';
import { setTiers } from '@/reducers/tiers';
import { setTags } from '@/reducers/tags';
import NotFound from '@/app/not-found';

const defaultGoBack = '/entity/teams/';
const TeamFormPage = props => {
	const dispatch = useDispatch();
	const pathname = usePathname()
	const { setItemToStorage } = useLocalStorage();
	const user = useSelector(state => state.user);
	const tiers = useSelector(state => props.tiers || state.tiers);
	const tags = useSelector(state => props.tags || state.tags);
	const { team, update = false } = props;

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			dispatch(setTiers(props.tiers));
		}
		if (!tags.length) {
			dispatch(setTags(props.tags));
		}
	}, []);

	if (user.loading || typeof window === 'undefined') {
		return <Loader active={true} inline="centered" />;
	}
	if (update && team && team.user.id !== user.id && !user.is_modo) {
		return <NotFound />;
	}
	return (
		<PageWrapper
			title={
				update
					? "Modifier l'équipe " + (team ? team.name : '')
					: 'Proposer une équipe'
			}
			metadescription="Proposez des équipes Pokémon stratégiques à la communauté, échangez avec d'autres membres dans les commentaires et ayez peut-être la chance de la voir se faire certifier."
			nofollow={update}
			className="form-propose-team-page"
		>
			<div className="mb-3">
				<GoBackButton
					callback={() => setItemToStorage(null, pathname)}
					defaultUrl={defaultGoBack}
				/>
			</div>
			{!update && (
				<p className="description framed">
					<b>Vous ne pouvez proposer qu'une seule équipe par tier à la fois</b>,
					alors choisissez-la bien. Une fois celle-ci définie comme certifiée ou
					non, vous pourrez de nouveau en publier une.
					<br />
					<br />
					La Team Strat de Coup Critique fait tout ce qu'elle peut pour
					s'occuper de votre équipe le plus vite possible. Merci de patienter le
					temps qu'il faudra, cela peut varier entre plusieurs heures ou
					quelques jours selon le tier.
					<br />
					<br />
					Aucun reposte d'équipe n'est autorisé, même avec l'accord de l'auteur.
					Si vous voulez voir l'équipe de quelqu'un d'autre sur le site,
					veuillez vous rapprocher de l'administration sur{' '}
					<a
						href="https://discord.gg/UNn4Se3ZKM"
						target="_blank"
						rel="noreferrer nofollow"
					>
						<Icon name="discord" className="m-0" /> Discord
					</a>{' '}
					pour qu'ils voient avec lui si l'équipe peut être publiée avec le
					compte <Link href="/entity/users/6029">Sample Team</Link> et si elle
					en vaut la peine.
				</p>
			)}
			{user.loading ? (
				<Loader active={true} inline="centered" />
			) : !user.token ? (
				<SignPanel />
			) : (
				<FormTeam tiers={tiers} tags={tags} defaultValue={team} />
			)}
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { tags } = await manageFetch(`tags`);
		const { tiers } = await manageFetch('tiers-select');
		return { props: { tags, tiers } };
	} catch (e) {
		console.error(e);
		return { props: {} };
	}
}

export default TeamFormPage;
