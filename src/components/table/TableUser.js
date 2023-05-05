// module
import React from 'react';
import { TableBase } from '@/components/table/Table';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// custom
import Profile from '@/components/elements/Profile';
import useTableSorter from '@/hooks/useTableSorter';
import UserBanButton from '@/components/actions/UserBanButton';
import UserModoButton from '@/components/actions/UserModoButton';
import HistoryPopup from '@/components/actions/HistoryPopup';
import { formatDate } from '@/functions';
import DeletePicture from '@/components/actions/DeletePicture';
import { useSelector } from 'react-redux';
import usePager from '@/hooks/usePager';
import PaginationPrettier from '@/components/PaginationPrettier';
import UserTiperButton from '@/components/actions/UserTiperButton';

const TableUser = ({
	users = [],
	setUsers,
	isModo = false,
	query,
	updateQuery,
	setQueryParam,
}) => {
	const [table, page, nbPages, handlePage] = usePager(50, users, query, setQueryParam);
	const ownUser = useSelector(state => state.user);

	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		users,
		setUsers,
		undefined,
		undefined,
		query,
		updateQuery
	);

	const handleValue = (i, name, value) => {
		const nextUsers = users.slice();
		nextUsers[i] = { ...users[i], [name]: value };
		setUsers(nextUsers);
	};

	return (
		<>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<TableBase
				className={'table-pokemon'}
				cols={[
					'Picture',
					{ key: 'username', content: 'Username', sortable: true },
					isModo
						&& ownUser.is_admin && {
							key: 'email',
							content: 'Email',
							sortable: true,
						},
					{ key: 'discord_name', content: 'Discord', sortable: true },
					{ key: 'showdown_name', content: 'Showdown', sortable: true },
					isModo && {
						key: 'date_creation',
						content: 'Date inscription',
						sortable: true,
					},
					isModo && 'Action',
				]}
				sortable
				sortedCol={sortedCol}
				orderDirection={orderDirection}
				handleSort={handleSort}
			>
				<tbody>
					{table.map((user, i) => (
						<tr key={i} /* className={colorOddRows(i)} */>
							<td>
								<Profile user={user} hideName />
							</td>
							<td className="text-break">
								<Link to={`/entity/users/${user.id}`}>
									{user.username}
								</Link>
							</td>
							{isModo && ownUser.is_admin && <td>{user.email}</td>}
							<td className="text-break">
								<Link to={`/entity/users/${user.id}`}>
									{user.discord_name}
								</Link>
							</td>
							<td className="text-break">
								<Link to={`/entity/users/${user.id}`}>
									{user.showdown_name}
								</Link>
							</td>
							{isModo && (
								<>
									<td>{formatDate(user.date_creation)}</td>
									<td>
										<HistoryPopup history={user.history} />
										{user.is_admin ? (
											<Label
												icon="chess queen"
												color="purple"
												size="large"
												className="rounded icon"
												title="administrateur"
											/>
										) : user.is_modo ? (
											ownUser.is_admin ? (
												<UserModoButton
													isIcon
													user={user}
													handleModo={(name, value) =>
														handleValue(i, name, value)
													}
												/>
											) : (
												<Label
													icon="gem"
													color="violet"
													size="large"
													className="rounded icon"
													title="modérateur"
												/>
											)
										) : (
											<>
												<UserBanButton
													isIcon
													user={user}
													handleBan={(name, value) =>
														handleValue(i, name, value)
													}
												/>
												{ownUser.is_admin && (
													<UserModoButton
														isIcon
														user={user}
														handleModo={(name, value) =>
															handleValue(i, name, value)
														}
													/>
												)}
											</>
										)}
										<UserTiperButton
											isIcon
											user={user}
											handleTiper={(name, value) =>
												handleValue(i, name, value)
											}
										/>
										{isModo && !!user.picture && (
											<DeletePicture
												user={user}
												handleDelete={(name, value) =>
													handleValue(i, name, value)
												}
											/>
										)}
									</td>
								</>
							)}
						</tr>
					))}
				</tbody>
			</TableBase>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
		</>
	);
};

export default TableUser;
