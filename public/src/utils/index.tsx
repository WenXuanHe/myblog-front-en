import { Map } from 'immutable'

export const setCurrentWorkInfo = function(){
    //todo 做成存到localstoage里面，后面直接取缓存的数据
}

export const setCurrentArticleInfo = function(){
    //todo 做成存到localstoage里面，后面直接取缓存的数据
}

export const getCurrentWorkInfo = function(workList, workID=0){
    workID = +workID;
    return workList.find((item) => item.id === workID);
}

export const getCurrentArticleInfo = function(articleList, articleID=0){
    articleID = +articleID;
    return articleList.find((item) => item.id === articleID);
}

export const arrayToHashByID = function(arr, id='id'){
    var info = {};
    arr.forEach((item) => {
        info[item[id]] = Map(item);
    });
    return info;
}

export default {  
    setCurrentWorkInfo,
    setCurrentArticleInfo,
    getCurrentWorkInfo,
    getCurrentArticleInfo,
    arrayToHashByID
}