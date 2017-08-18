import {persistenceTimingInfo} from '$apis'
import timing from '$utils/timing'

export default () => {

    window.addEventListener('load',  () => {
        setTimeout(()=>{
            persistenceTimingInfo(timing());
        }, 5000);
    }, false);
}

