import apis from  '../apis';
import { ActionTypes } from '$redux/actionType/index'

/**
 * 去数据库新建文集
 */
export const fetchCreateNewWork = (title:string) => async (dispatch) => {
    
    try{
        let result = await apis.createNewWork(title);
        dispatch({
            type: ActionTypes.CREATE_NEW_WORK,
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
export const fetchChangeActiveWork = (workID:string|number) => async (dispatch) => {
    try{
        let result = await apis.queryArticlesByworkId(workID);
        
        dispatch({
            type: ActionTypes.CHANGE_ACTIVE_WORK,
            payload:{
                workID:workID,
                articleList:result
            }
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const fetchCreateNewArticle = (workID:string|number) => async (dispatch) => {
    try{
        let result = await apis.createNewArticle(workID);
        
        dispatch({
            type: ActionTypes.CREATE_NEW_ARTICLE,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const deleteArticleById = (articleID:string|number) => async (dispatch) => {

    try{
        let result = await apis.deleteArticle(articleID);
        
        dispatch({
            type: ActionTypes.DELETE_ARTICLE,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const deleteCurrentWorkById = (workID:string|number) => async (dispatch) => {
    
        try{
            let result = await apis.deleteCurrentWork(workID);
            
            dispatch({
                type: ActionTypes.DELETE_WORK,
                payload:result
            });
        
        }catch(e){
    
             throw new Error(e);
        }
    }

export const updateArticleInfo = (params:{ title?:string, articleID:string|number, content?:string}) => async (dispatch) => {

    try{
        let result = await apis.updateArticleInfo(params);
        if(result.status){
             dispatch({
                type: ActionTypes.UPDATE_ARTICLE_INFO,
                payload:params
            });
        }else{
            // alert(result.msg);
        }
       
    
    }catch(e){

         throw new Error(e);
    }
}

export default{

    fetchCreateNewWork,
    fetchChangeActiveWork,
    fetchCreateNewArticle,
    deleteArticleById,
    updateArticleInfo,
    deleteCurrentWorkById
}