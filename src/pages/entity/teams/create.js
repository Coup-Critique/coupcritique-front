// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// components
import useFetch, { manageFetch } from '@/hooks/useFetch';
import useLocalStorage from '@/hooks/useLocalStorage';
import FormTeam from '@/components/forms/FormTeam';
import PageWrapper from '@/components/PageWrapper';
import SignModal from '@/components/modals/SignModal';
import { setTiers } from '@/reducers/tiers';
import { setTags } from '@/reducers/tags';
import LoadingPage from '@/pages/loading';

const defaultGoBack = '/entity/teams/';
const TeamFormPage = props => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { pathname, query } = router;
	const { setItemToStorage } = useLocalStorage();
	const user = useSelector(state => state.user);
	const tiers = useSelector(state => props.tiers || state.tiers);
	const tags = useSelector(state => props.tags || state.tags);
	const { team, update = false } = props;
	const [resultTiers, loadTiers, loadingTiers] = useFetch();
	const [resultTags, loadTags, loadingTags] = useFetch();

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			if (props.tiers) {
				dispatch(setTiers(props.tiers));
			} else {
				loadTiers({ url: 'tiers-select' });
			}
		}
		if (!tags.length) {
			if (props.tags) {
				dispatch(setTags(props.tags));
			} else {
				loadTags({ url: 'tags' });
			}
		}
	}, []);

	useEffect(() => {
		if (resultTiers && resultTiers.success) {
			dispatch(setTiers(resultTiers.tiers));
		}
	}, [resultTiers]);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			dispatch(setTags(resultTags.tags));
		}
	}, [resultTags]);

	// TODO rather make a cancel button and keep local storage on go back
	const goBack = () => {
		const storageKey = `form_${pathname.replace(`[id]`, query.id)}`;
		setItemToStorage(null, storageKey);
		if (history.length > 2) {
			router.back();
		} else {
			router.replace(defaultGoBack);
		}
	};

	if (user.loading || typeof window === 'undefined') {
		return <Loader active={true} inline="centered" />;
	}
	if (update && team && team.user.id !== user.id && !user.is_modo) {
		return <LoadingPage />;
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
			goingBack={defaultGoBack}
			goBackCallback={goBack}
		>
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
				<SignModal />
			) : (
				<FormTeam
					tiers={tiers}
					tags={tags}
					defaultValue={team}
					loadingTiers={loadingTiers}
				/>
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
