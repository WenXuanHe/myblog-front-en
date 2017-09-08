import { Map, List } from 'immutable'

export let isMap = (map) => map instanceof Map;

export let isList = (list) => list instanceof List;

export let getter = (state, prop) => {

    return isMap(state) ? state.getIn([prop.toString()]) : state ? state[prop]: null;
} 

export default {
    isMap,
    isList,
    getter
};