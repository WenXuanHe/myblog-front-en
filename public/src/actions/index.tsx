import apis from  '../apis';
import { ActionTypes } from '$redux/actionType/index'
import {getOutHistory, memoryHistory, deleteArticleInCache, updateArticleCached} from '../cache/index'

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
        //判断缓存中是否存在
        let articleList = await getOutHistory(`articleList:${workID}`);

        if(!articleList){
            articleList = await apis.queryArticlesByworkId(workID);
            memoryHistory({type:`articleList:${workID}`}, articleList);
        }
        
        dispatch({
            type: ActionTypes.CHANGE_ACTIVE_WORK,
            payload:{
                workID,
                articleList
            }
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const fetchCreateNewArticle = (workID:string|number) => async (dispatch) => {
    try{
        let result = await apis.createNewArticle(workID);
        memoryHistory({
            type: `articleList:${workID}`, 
            saveInHash:true
        }, result);

        dispatch({
            type: ActionTypes.CREATE_NEW_ARTICLE,
            payload:result
        });
    
    }catch(e){

         throw new Error(e);
    }
}

export const deleteArticleById = (workID:string|number, articleID:string|number) => async (dispatch) => {

    try{
        let result = await apis.deleteArticle(articleID);
        deleteArticleInCache(`articleList:${workID}`, articleID);
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
            deleteArticleInCache(`articleList:${workID}`);
            dispatch({
                type: ActionTypes.DELETE_WORK,
                payload:result
            });
        
        }catch(e){
    
             throw new Error(e);
        }
    }

export const updateArticleInfo = (params:{ title?:string, currentWorkID:string|number, articleID:string|number, content?:string}) => async (dispatch) => {

    try{
        let result = await apis.updateArticleInfo(params);
        updateArticleCached(`articleList:${params.currentWorkID}`, params.articleID, params);
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