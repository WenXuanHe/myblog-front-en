let { getter } = require ('$utils/immutable-extend');

const mapStateToProps = (stateName, needs=[]) => (state, ownProps) =>{
    let res = {};
    needs.forEach((item) => {
        res[item] = getter(state[stateName], 'workList');
    })
    return res;
}

module.exports = mapStateToProps;
