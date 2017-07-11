import axios from 'axios'

export default (action, {
    fetchData,
    url
    }) => (dispatch) => {
        dispatch(action({}));
        axios.post(url, fetchData).then((res) => {
            let result = res.data.result;
            dispatch(action({
                status: 'success',
                payload: result
            }));
        }).catch((e) => {
            dispatch(action({
                status: 'error',
                payload: e
            }));
        })
    }