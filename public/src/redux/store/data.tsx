import { Map, List } from 'immutable'

export type dataStates = Map<string, {
    workList: any;
    articleLists: any;
    currentArticleID: number;
    currentWorkID: number;
}>

interface StoreState{
    data:dataStates
}

const States:StoreState = {
    data:Map({ writer: {
        workList: null,
        articleLists:null,
        currentArticleID:0,
        currentWorkID:0,
    }
})
    
}



export default States.data;
