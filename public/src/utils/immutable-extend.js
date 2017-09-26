import { Map, List } from "immutable";

export const isMap = map => map instanceof Map;

export const isList = list => list instanceof List;

export const getter = (state, prop) =>
	isMap(state) ? state.getIn([prop.toString()]) : state ? state[prop] : null;

export default {
	isMap,
	isList,
	getter,
};
