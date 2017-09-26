/**
 * 防抖
 */
export default (wait = 1000) => {
	let timer = null;
	function boundle(callBack, ...args) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callBack(...args);
		}, wait);
	}
	return boundle;
};
