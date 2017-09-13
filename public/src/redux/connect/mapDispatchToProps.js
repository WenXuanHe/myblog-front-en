import actions from '$actions/index'
import actionType from '$redux/actionType'

export  const writer = (dispatch, ownProps) => {
    return {
        updateArticleInfo: (data) => { dispatch(actions.updateArticleInfo(data)) },
        //同步更新题目
        UpdateTitle: (title) => {
            dispatch({
                type: actionType.UPDATE_ARTICLE_INFO,
                payload: {title}
            })
        }
    }
}

export const article = (dispatch, ownProps) => {
    return {
        createNewArticle: (workID) => { dispatch(actions.fetchCreateNewArticle(workID)) },
        deleteArticleById: (articleID) => {  dispatch(actions.deleteArticleById(articleID)) },

        changeActiveArticle: (data) => {
            dispatch({
                type:actionType.CHANGE_ACTIVE_ARTICLE,
                payload: data })
        },
    }
}

export const work = (dispatch, ownProps) =>{
    return {
        createNewWork: (title)=>{dispatch(actions.fetchCreateNewWork(title))},
        changeActiveWork:(workID)=>{dispatch(actions.fetchChangeActiveWork(workID))}
    }
}
export default{
    writer,article,work
}
