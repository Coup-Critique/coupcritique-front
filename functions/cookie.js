export const getCookie = cname => {
	const name = cname + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookie_array = decodedCookie.split(';');
	let value = undefined;
	cookie_array.forEach(el => {
		el = el.trim();
		if (el.indexOf(name) === 0) {
			value = el.substring(name.length, el.length) === 'true';
		}
	});
	return value;
};

export function setCookie(name, value) {
	var d = new Date();
	d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000); // d-h-m-s-1000
	document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/';
}
