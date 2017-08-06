let {Map, List} = require('immutable');


let isMap = (map) => map instanceof Map;

let isList = (list) => list instanceof List;

let getter = (state, prop) => {

    return isMap(state) ? state.getIn([prop.toString()]) : state ? state[prop]: null;
} 

module.exports = {
    isMap,
    isList,
    getter
};