import axios from 'axios'

export const createNewWork =  function(title:string){
    return axios.post('/writer/createNewWork', {
        title:title
    }).then(function(res){
        return res.data.result;
    })
}

export const queryArticlesByworkId = function(workID:number|string){

    return axios.get('/base/queryArticlesByworkId', {
        params:{
            workID:workID
        }
    }).then(function(res){
        return res.data.result;
    })

}

export const createNewArticle = function(workID:number|string){

    return axios.post('/writer/createNewArticle', {
        workID
    }).then(function(res){
        return res.data.result;
    })
}

export const deleteArticle = function(articleID:number|string){

    return axios.post('/writer/deleteArticleById', {
        articleID
    }).then(function(res){
        return res.data.result;
    })
}

export const deleteCurrentWork = function(workID:number|string){
    
    return axios.post('/writer/deleteWorkById', {
        workID
    }).then(function(res){
        return res.data.result;
    })
}

export const updateArticleInfo = function(params:{ title?:string, articleID:string|number, content?:string}){

     return axios.post('/writer/updateArticleInfo', params).then(function(res){
        return res.data;
    })
}

/**
 * 持久化页面性能数据
 * @param  {[type]} params [description]
 * @return {[type]}        promise
 */
export const persistenceTimingInfo = function(params:{connectTime:number, pageLoadTime:number, renderTime:number}){

     return axios.post('/base/persistenceTimingInfo', params);
}

/**
 * 获取页面渲染信息
 */
export const getPersistenceTimingInfo = function(){
    
    return axios.get('/base/getPersistenceTimingInfo')
        .then(function(res){
        return res.data.result;
    });
}

export default{
    createNewWork,
    queryArticlesByworkId,
    createNewArticle,
    deleteArticle,
    deleteCurrentWork,
    updateArticleInfo,
    persistenceTimingInfo,
    getPersistenceTimingInfo
}
