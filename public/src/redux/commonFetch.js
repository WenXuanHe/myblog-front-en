import axios from 'axios'

export default (action, {
    fetchData,
    url,
    callBack
    }) => (dispatch) => {
        dispatch(action());
        axios.post(url, fetchData).then((res) => {
            let result = res.data.result;

            if(typeof callBack === 'function'){
                callBack(result);
            }

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