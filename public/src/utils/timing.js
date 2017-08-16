const timing = function () {
    var perfData = window.performance.timing;
    var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    var connectTime = perfData.responseEnd - perfData.requestStart;
    var renderTime = perfData.domComplete - perfData.domLoading;
    return {
        pageLoadTime,
        connectTime,
        renderTime
    }
}
export default timing;
