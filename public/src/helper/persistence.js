import {persistenceTimingInfo} from '$apis/index'
import timing from '$utils/timing'

export default () => {

    window.addEventListener('load',  () => {
        setTimeout(()=>{
            persistenceTimingInfo(timing());
        }, 5000);
    }, false);
}

