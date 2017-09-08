
import { getter } from '../../utils/immutable-extend';

const mapStateToProps = (stateName, needs=[]) => (state, ownProps) =>{
    let res = {};
    needs.forEach((item) => {
        res[item] = getter(state[stateName], item);
    })
    return res;
}

export default mapStateToProps;
