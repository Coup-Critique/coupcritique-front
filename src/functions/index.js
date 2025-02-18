const camelToKebab = str => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const rmUndefined = props => {
	if (!props) return props;
	Object.entries(props).forEach(([key, value]) => {
		if (value === undefined) delete props[key];
	});
	return props;
};

/**
 * @argument {args} classList of [string, array, false, null, undefined]
 * @returns {string}
 */
export const makeClassName = (...classList) =>
	classList.reduce((classList, className) => {
		if (!className) return classList;
		if (Array.isArray(className)) className = makeClassName(className);
		if (typeof className === 'object') {
			Object.entries(className).forEach(([key, value]) => {
				if (value) classList += ' ' + camelToKebab(key);
			});
			return classList;
		}
		if (!classList) return className;
		return classList + ' ' + className;
	}, '');
// faster than classList.flat().filter(c => c).join(' ')

export const objectToGETparams = object =>
	Object.entries(object).reduce((params, [key, value]) => {
		if (value === undefined || value === '') return params;
		if (Array.isArray(value)) {
			if (value.length === 0) return params;
			value = value.join(',');
		}
		return `${params}${params ? '&' : '?'}${key}=${encodeURIComponent(value)}`;
	}, '');

export const arrayCompare = (a, b) => {
	if (!a && !b) return true;
	if (!Array.isArray(a) || !Array.isArray(b)) return false;
	return a.length === b.length && a.every((v, i) => v === b[i]);
};

export function objectCompare(object1, object2) {
	if (object1 == null && object2 == null) {
		return true;
	} else if (object1 == null || object2 == null) {
		return false;
	}
	if (Object.keys(object1).length !== Object.keys(object2).length) {
		return false;
	}
	for (let [key, value] of Object.entries(object1)) {
		// compare arrays as objects
		if (typeof value === 'object' && typeof object2[key] === 'object') {
			if (!objectCompare(value, object2[key])) {
				return false;
			}
		} else if (value !== object2[key]) {
			return false;
		}
	}
	return true;
}

export function buildFieldsMessage(errors_array) {
	const errors_object = {};
	errors_array.forEach(error => {
		const { field, message } = error;
		if (field.includes('.')) {
			const fields = field.split('.');
			let pill = errors_object;
			for (let i = 0; i < fields.length; i++) {
				if (i === fields.length - 1) {
					pill[fields[i]] = message;
				} else {
					pill[fields[i]] = {};
					pill = pill[fields[i]];
				}
			}
		} else {
			errors_object[field || 'form'] = message;
		}
	});
	return errors_object;
}

/**
 * @param {number} nb
 * @return {string}
 */
export function formatNumbers(nb, decimals = 2) {
	// prevent from -0,00 for very small negative values
	if (nb > -0.005 && nb < 0.005) nb = 0;
	nb = new Intl.NumberFormat('fr-FR', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(nb);
	// firefox blankspace bug
	return nb.replace(/\s+/g, '\u00A0');
}

export function formatPrices(price, decimal = false) {
	const nbDigit = decimal ? 2 : 0;
	// prevent from -0,00 for very small negative values
	if (price > -0.005 && price < 0.005) price = 0;
	price = new Intl.NumberFormat('fr-FR', {
		minimumFractionDigits: nbDigit,
		maximumFractionDigits: nbDigit,
	}).format(price);
	// firefox blankspace bug
	price = price.replace(/\s+/g, '\u00A0');
	return price + '\u00A0€';
}

export const formateName = string => string.replace(/[\s-]+/g, ' ');

export const getName = entity => entity.nom || formateName(entity.name);
export const getMetaName = entity =>
	(entity.nom ? `${entity.nom} / ` : '') + formateName(entity.name);

// prettier-ignore
export const formatFileName = string => string
	.normalize('NFD')
	.replace(/(\s+)/g, '-')
	.replace(/[.'’:?%\u0300-\u036f]|-(t|T)otem|-(a|A)ntique/g, '')
	.toLowerCase();

export const capitalize = string => string[0].toUpperCase() + string.slice(1);

/**
 * @param {string} date
 * @return {string}
 */
export const formatDate = date => date.split('-').reverse().join('/');

export const isToday = someDate => {
	const today = new Date();
	return (
		someDate.getDate() == today.getDate() &&
		someDate.getMonth() == today.getMonth() &&
		someDate.getFullYear() == today.getFullYear()
	);
};

// prettier-ignore
export const youtubeWatchRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;
export const youtubeEmbedRegex = /^https:\/\/www.youtube.com\/embed\/([a-zA-Z0-9_-]+)$/;
export const youtubeBeRegex = /^https:\/\/youtu.be\/([a-zA-Z0-9_-]+)$/;

export const getYoutubeId = url => {
	url = url.split('&')[0];

	let youtube_id = url.match(youtubeEmbedRegex)?.[1];
	if (!youtube_id) {
		youtube_id = url.match(youtubeWatchRegex)?.[1];
		if (!youtube_id) {
			youtube_id = url.match(youtubeBeRegex)?.[1];
		}
	}
	return youtube_id;
};

export function scrollToTopAnimate() {
	window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
}

/**
 * @param {object} data
 * @return {FormData}
 */
export function buildFormData(data) {
	const formData = new FormData();
	Object.entries(data).map(([key, value]) => formData.append(key, value));
	return formData;
}
/**
 * copy text sent as param to clipboard
 * @param {string} content
 * Not working with server on local VHOST it's okay (only localhost or https)
 */
export const copyToClipboard = content =>
	navigator.clipboard && navigator.clipboard.writeText(content);

export const parseKoffingInstance = instance => {
	instance.pokemon = instance.name;
	instance.tera = instance.teraType;
	if (instance.evs) {
		Object.entries(instance.evs).forEach(
			([key, value]) => (instance[key + '_ev'] = value)
		);
	}
	if (instance.ivs) {
		Object.entries(instance.ivs).forEach(
			([key, value]) => (instance[key + '_iv'] = value)
		);
	}
	if (instance.moves) {
		instance.moves.forEach((move, j) => (instance['move_' + (j + 1)] = move));
	}
	return instance;
};

/**
 * @param {number} mo
 * @return {number}
 */
export const megaBytesToBits = mo => mo * 1048576;
