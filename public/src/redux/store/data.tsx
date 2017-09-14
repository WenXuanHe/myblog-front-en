import { Map, List } from 'immutable'

type WriterType = Map<string, {
    workList: null,
    articleLists: null,
    currentArticleID: 0,
    currentWorkID: 0,
}>

export type storeType = {
    writer: WriterType
}

const storeStates = {
    writer: Map({
        workList: null,
        articleLists: null,
        currentArticleID: 0,
        currentWorkID: 0,
    })
}

export default storeStates;
