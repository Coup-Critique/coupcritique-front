// modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Grid, Button, Icon, Loader } from 'semantic-ui-react';
// components
import FormPassword from '@/components/forms/FormPassword';
import FormUpdateUser from '@/components/forms/FormUpdateUser';
import PageWrapper from '@/components/PageWrapper';
import TableTeam from '@/components/table/TableTeam';
// hooks
import useFetch from '@/hooks/useFetch';
import useLogout from '@/hooks/useLogout';
// reducers
import { addMessage } from '@/reducers/messages';
import GoBackButton from '@/components/GoBackButton';
import useTableFetch from '@/hooks/useTableFetch';
import ModalConfirm from '@/components/modals/ModalConfirm';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';
import LoadingPage from '@/pages/loading';

// Own User
const UserFormPage = () => {
	const dispatch = useDispatch();
	const logout = useLogout();
	const id = useGetParam('id');
	useNotifChecker('user', id);
	const user = useSelector(state => state.user);
	const [resDelete, deleteUser, loadingDelete] = useFetch();

	const {
		table,
		setTable,
		loading,
		handleLoad,
		nbPages,
		query,
		handlePage,
		handleSort,
	} = useTableFetch('teams', {
		loadUrl: !user.loading && user.id ? `teams/user/${user.id}` : null,
	});

	useEffect(() => {
		if (resDelete?.success) {
			dispatch(addMessage(resDelete.message, true));
			logout();
		}
	}, [resDelete]);

	const handleDelete = e =>
		deleteUser({ url: 'own-user', method: 'DELETE', token: user.token });

	if (user.loading || typeof window === 'undefined') {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id) {
		return <LoadingPage />;
	}
	return (
		<PageWrapper title="Compte utilisateur" goingBack nofollow>
			<Grid divided relaxed className="form-columns">
				<Grid.Column mobile="16" computer="8">
					<Header textAlign={'center'} as="h2">
						Modifier vos informations
					</Header>
					<FormUpdateUser />
				</Grid.Column>
				<Grid.Column mobile="16" computer="8">
					<Header textAlign={'center'} as="h2">
						Modifier votre mot de passe
					</Header>
					<FormPassword />
				</Grid.Column>
			</Grid>
			<ModalConfirm
				handleConfirm={handleDelete}
				trigger={
					<Button
						color="red"
						className="delete-account"
						// onClick={handleDelete}
						loading={loadingDelete}
						size="tiny"
					>
						<Icon name="trash alternate" /> Supprimer votre compte
					</Button>
				}
				confirmButtonProps={{
					icon: 'trash alternate',
					color: 'red',
					content: 'Supprimer',
				}}
			>
				Êtes-vous sûr de vouloir supprimer votre compte&nbsp;?
			</ModalConfirm>
			<section id="pagination-scroll-ref">
				<Header as="h2">Vos teams</Header>
				{user.loading || loading ? (
					<Loader active inline="centered" />
				) : table.length ? (
					<TableTeam
						teams={table}
						setTeams={setTable}
						handleLoad={handleLoad}
						handleSort={handleSort}
						handlePage={handlePage}
						query={query}
						nbPages={nbPages}
						hideUser
						deletable
					/>
				) : (
					<p>Vous n'avez pas de team.</p>
				)}
			</section>
		</PageWrapper>
	);
};

export default UserFormPage;
