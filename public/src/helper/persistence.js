import {persistenceTimingInfo} from '$api'
import timing from '$utils/timing'

export default const persistence =  () => {

    window.addEventListener('load',  () => {
        persistenceTimingInfo(timing);
    }, false);
}

