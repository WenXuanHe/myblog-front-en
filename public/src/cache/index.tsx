
import * as localforage from 'localforage'

export const getOutHistory = function (type: string) {

    return localforage.getItem(type).catch(function(e){
            console.error("取出缓存报错:", e);
        });
}

export const memoryHistory = function ({type, saveInHash=false}:{type: string, saveInHash?:boolean}, info) {

    if(!saveInHash){
        return localforage.setItem(type, info).catch(function(e){
            console.error("存储失败:", e);
        });
    }else{
        return getOutHistory(type).then((values:Array<any>) => {
            values.unshift(info);
            localforage.setItem(type, values).catch(function(e){
                console.error("存储失败:", e);
            });
        });
    }
}

export const deleteArticleInCache = function(type:string,  articleID?:string|number){

    if(!articleID){
        localforage.removeItem(type).catch(e =>{
            console.error("删除失败:", e);
        });
    }else{
        getOutHistory(type).then((values:Array<any>) => {
            let info = values.find(item => +item.id === +articleID);
            let index = values.indexOf(info);
            values.splice(index, 1);
            memoryHistory({type}, values);
        });
    }
}

export const updateArticleCached = function(type:string,  articleID:string|number, info:any){
    getOutHistory(type).then((values:Array<any>) => {
        let current = values.find(item => +item.id === +articleID);
        Object.assign(current, info);
        memoryHistory({type}, values);
    });
}

export const isCached = function(type: string){
    return getOutHistory(type).then(value => {
        if(value){
            return true;
        }else{
            return false;
        }
    }); 
}

export default{
    getOutHistory,
    memoryHistory
}
