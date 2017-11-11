
import './styles/common/common.scss'
import './styles/writer.scss'
import './styles/index.scss'
import {List, Map} from 'immutable'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

//把 _INITIAL_STATE_ 转换为immutable的形式
function changeToImmutable(data){

    if(isObject(data)){
        if(isArray(data)){
            return List(data).map(item => {
                return changeToImmutable(item);
            });
        }else{
            return Map(data).map((value, key) => {
                if(isObject(value)){
                    return changeToImmutable(value);
                }

                return value;
            });
        }
    }
    
    return data;
}

window['_INITIAL_STATE_'] = {
    writer: changeToImmutable(window['_INITIAL_STATE_'].writer)
};

