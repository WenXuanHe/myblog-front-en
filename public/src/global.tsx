// import _ from 'lodash';

import './styles/common/common.scss'
import './styles/writer.scss'
import './styles/index.scss'
import {List, Map} from 'immutable'
import * as _ from 'lodash'

//把 _INITIAL_STATE_ 转换为immutable的形式
function changeToImmutable(data){

    if(_.isObject(data)){
        if(_.isArray(data)){
            return List(data).map(item => {
                return changeToImmutable(item);
            });
        }else{
            return Map(data).map((value, key) => {
                if(_.isObject(value)){
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

