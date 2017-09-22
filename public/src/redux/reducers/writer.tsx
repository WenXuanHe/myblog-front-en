import data from '../store/data'
import { deal } from './writerImpl'

let reducer = (state = data.writer, action) => {

    let workList = state.get('workList'), 
    currentWorkID:string = state.get('currentWorkID').toString(), 
    currentArticleID:string = state.get('currentArticleID').toString();

    return deal[action.type] && deal[action.type](state, action, {workList, currentWorkID, currentArticleID}) || state;
}

export default reducer;

