// modules
import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// components
import { Form, Label, Loader, Search } from 'semantic-ui-react';
// reducers
import { setChosenSearch } from '@/reducers/search';
// hooks
import useFetch from '@/hooks/useFetch';
import useDarkMode, { DARK_MODE_KEY } from '@/hooks/useDarkMode';
import { formateName } from '@/functions';
import { NUMBER_OF_PREVIEWS } from '@/constants/index';

const MainSearch = ({
	messageGiven,
	pageResultUrl = '/search/',
	placeholder = 'Recherche Pokémon, objet, talent, tier...',
	size = 'large',
	isUserSearch = false,
	styleClass = '',
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [result, load, loading] = useFetch(false);
	const [darkMode] = useDarkMode();
	const { chosen_search } = useSelector(state => state.search);
	const [string, setString] = useState(chosen_search);
	const [message, setMessage] = useState(messageGiven);

	useEffect(() => {
		if (messageGiven) {
			setMessage(messageGiven);
		}
	}, [messageGiven]);

	useEffect(() => {
		if (!isUserSearch) setMessage(false);
	}, [chosen_search]);

	const choosePreview = (e, { result: { id, entity, title } }) => {
		if (!isUserSearch) dispatch(setChosenSearch(title));

		setString(title);
		history.push(`/entity/${entity}/${id}`);
	};

	const handleOnChange = (e, { value }) => {
		setString(value);
		value = value.trim();
		if (value.length > 1) {
			if (!isUserSearch) {
				load({ url: `search/previews/${value}` });
			} else {
				load({ url: `users/search/${value}/${NUMBER_OF_PREVIEWS}` });
			}
		}
		dispatch(setChosenSearch(''));
		setMessage(false);
	};

	const resultToOptions = useMemo(() => {
		if (!result || !result.success) return null;
		if (!isUserSearch) {
			const previews = result.previews.reduce((previews, el) => {
				if (!previews[el.category]) {
					previews[el.category] = { name: el.category, results: [] };
				}
				previews[el.category].results.push({
					title: el.nom || formateName(el.name),
					entity: el.entity,
					id: el.id,
				});
				return previews;
			}, {});
			return previews;
		} else {
			const previews = {
				users: {
					name: 'Utilisateurs',
					results: result.users.map(user => ({
						title: user.username,
						entity: 'users',
						id: user.id,
					})),
				},
			};
			return previews;
		}
	}, [result]);

	const onSubmit = e => {
		if (e) e.preventDefault();
		if (string) {
			if (string.length < 2) {
				setMessage('Votre recherche doit faire au moins 2 caractères.');
			} else {
				if (!isUserSearch) dispatch(setChosenSearch(string));
				history.push(pageResultUrl + encodeURIComponent(string || chosen_search));
			}
		}
	};

	return (
		<Form className="inline" onSubmit={onSubmit} size={size}>
			<Form.Field
				className={`main-search ${styleClass} ${darkMode ? DARK_MODE_KEY : ''}`}
			>
				<Search
					category
					value={isUserSearch ? string : string || chosen_search}
					loading={loading}
					input={{
						icon: null,
						placeholder,
						action: {
							icon: 'search',
							color: isUserSearch ? 'red' : 'blue',
						},
					}}
					onSearchChange={handleOnChange}
					onResultSelect={choosePreview}
					minCharacters={2}
					results={resultToOptions}
					noResultsMessage={
						loading ? (
							<>
								<Loader active size="small" /> Chargement...
							</>
						) : (
							'Pas de resultat trouvé'
						)
					}
				/>
				{!!message && (
					<Label prompt pointing className="above" role="alert">
						{message}
					</Label>
				)}
			</Form.Field>
		</Form>
	);
};

export default MainSearch;
