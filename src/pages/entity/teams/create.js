// modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// components
import FormTeam from '@/components/forms/FormTeam';
import PageWrapper from '@/components/PageWrapper';
import SignPanel from '@/components/SignPanel';
import GoBackButton from '@/components/GoBackButton';
// reducers
import { setTiers } from '@/reducers/tiers';
import { setTags } from '@/reducers/tags';
import { Link, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';

const defaultGoBack = "/entity/teams/";
const ProposeTeam = ({ result = {}, update = false }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { setItemToStorage } = useLocalStorage();
	const { user, tiers, tags } = useSelector(state => state);
	const [resultTiers, loadTiers, loadingTiers] = useFetch();
	const [resultTags, loadTags, loadingTags] = useFetch();

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			loadTiers({ url: 'tiers-select' });
		}
		if (!tags.length) {
			loadTags({ url: 'tags' });
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

	if (
		update
		&& result
		&& result.team
		&& result.team.user.id !== user.id
		&& !user.is_modo
	) {
		return <Redirect to={defaultGoBack} />;
	}

	return (
		<PageWrapper
			title={
				update
					? "Modifier l'équipe " + (result.team ? result.team.name : '')
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
					<b>Vous ne pouvez proposer qu'une seule équipe par tier à la fois</b>, alors
					choisissez-la bien. Une fois celle-ci définie comme certifiée ou non,
					vous pourrez de nouveau en publier une.
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
					compte <Link to="/entity/users/6029">Sample Team</Link> et si elle en
					vaut la peine.
				</p>
			)}
			{user.loading ? (
				<Loader active={true} inline="centered" />
			) : !user.token ? (
				<SignPanel />
			) : (
				<FormTeam
					tiers={tiers}
					tags={tags}
					loadingTiers={loadingTiers}
					defaultValue={result.team}
				/>
			)}
		</PageWrapper>
	);
};
export default ProposeTeam;
