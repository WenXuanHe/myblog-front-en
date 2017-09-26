const timing = function() {
	const perfData = window.performance.timing;
	const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
	const connectTime = perfData.responseEnd - perfData.requestStart;
	const renderTime = perfData.domComplete - perfData.domLoading;
	return {
		pageLoadTime,
		connectTime,
		renderTime,
	};
};
export default timing;
