import apis from  '../apis';
import actionType from  '../redux/actionType';

/**
 * 去数据库新建文集
 */
export const fetchCreateNewWork = (title) => async (dispatch) => {
    
    try{
        let result = await apis.createNewWork(title);
        dispatch({
            type: actionType.CREATE_NEW_WORK,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

/**
 * 改变文件，拉取当前文集下的所有文章
 * @param {*} workID 
 */
export const fetchChangeActiveWork = (workID) => async (dispatch) => {
    try{
        let result = await apis.queryArticlesByworkId(workID);
        
        dispatch({
            type: actionType.CHANGE_ACTIVE_WORK,
            payload:{
                workID:workID,
                articleList:result
            }
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const fetchCreateNewArticle = (workID) => async (dispatch) => {
    try{
        let result = await apis.createNewArticle(workID);
        
        dispatch({
            type: actionType.CREATE_NEW_ARTICLE,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const deleteArticleById = (articleID) => async (dispatch) => {

    try{
        let result = await apis.deleteArticle(articleID);
        
        dispatch({
            type: actionType.DELETE_ARTICLE,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const updateArticleInfo = (params) => async (dispatch) => {

    try{
        let result = await apis.updateArticleInfo(params);
        
        dispatch({
            type: actionType.UPDATE_ARTICLE_INFO,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export default{

    fetchCreateNewWork,
    fetchChangeActiveWork,
    fetchCreateNewArticle,
    deleteArticleById,
    updateArticleInfo
}