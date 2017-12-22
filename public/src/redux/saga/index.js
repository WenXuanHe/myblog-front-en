import apis from  '$apis';
import { ActionTypes } from '$redux/actionType/index'
import {getOutHistory, memoryHistory, deleteArticleInCache, updateArticleCached} from '../../cache/index'
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga'

/**
 * 去数据库新建文集
 */
export const fetchCreateNewWork = function *({payload}){

    try{
        let result = yield call(apis.createNewWork, payload.title);
        yield put({
            type: ActionTypes.CREATE_NEW_WORK,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};


/**
 * 改变文件，拉取当前文集下的所有文章
 * @param {*} workID
 */
export const fetchChangeActiveWork = function *({payload}){
    try{
        //判断缓存中是否存在
        let articleList = yield call(getOutHistory, `articleList:${payload.workID}`);

        if(!articleList){
            articleList = yield call(apis.queryArticlesByworkId, payload.workID);
            memoryHistory({type:`articleList:${workID}`}, articleList);
        }

        put({
            type: ActionTypes.CHANGE_ACTIVE_WORK,
            payload:{
                workID: payload.workID,
                articleList
            }
        });

    }catch(e){

        throw new Error(e);
    }
};

export const fetchCreateNewArticle = function *({payload}){
    try{
        let result = yield call(apis.createNewArticle, payload.workID);
        memoryHistory({
            type: `articleList:${payload.workID}`,
            saveInHash:true
        }, result);

        put({
            type: ActionTypes.CREATE_NEW_ARTICLE,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};

export const deleteArticleById = function *({payload}){
    let {articleID, workID} = payload;

    try{
        let result = yield call(apis.deleteArticle, articleID);
        deleteArticleInCache(`articleList:${workID}`, articleID);
        put({
            type: ActionTypes.DELETE_ARTICLE,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};

export const deleteCurrentWorkById = function *(payload){

    let {workID} = payload;
    try{
        let result = yield call(apis.deleteCurrentWork, workID);
        deleteArticleInCache(`articleList:${workID}`);
        put({
            type: ActionTypes.DELETE_WORK,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};

export const updateArticleInfo = function *(payload){
    let {title, currentWorkID, articleID, content} = payload;
    try{
        let result = yield call(apis.updateArticleInfo, params);
        updateArticleCached(`articleList:${currentWorkID}`, articleID, payload);
        if(result.status){
            put({
                type: ActionTypes.UPDATE_ARTICLE_INFO,
                payload:payload
            });
        }else{
            // alert(result.msg);
        }


    }catch(e){

        throw new Error(e);
    }
};

function *watchFetchData() {
    yield *[
        takeEvery("fetchCreateNewWork", fetchCreateNewWork),
        takeEvery("fetchChangeActiveWork", fetchCreateNewWork),
        takeEvery("fetchCreateNewArticle", fetchCreateNewWork),
        takeEvery("deleteArticleById", fetchCreateNewWork),
        takeEvery("deleteCurrentWorkById", fetchCreateNewWork),
        takeEvery("updateArticleInfo", fetchCreateNewWork),
    ];

}

export default watchFetchData;