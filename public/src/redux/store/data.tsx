import {fromJS} from 'immutable'

type WriterType = Map<string, {
    workList: any,
    articleLists: any,
    currentArticleID: number,
    currentWorkID: number,
}>;

export type storeType = {
    writer: any
}

const storeStates:storeType = {
    writer: fromJS({
        workList: null,
        articleLists: null,
        currentArticleID: 0,
        currentWorkID: 0,
    })
}

export default storeStates;
