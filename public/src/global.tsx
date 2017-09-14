// import _ from 'lodash';

import './styles/common/common.scss'
import './styles/writer.scss'
import './styles/index.scss'
import {List, Map} from 'immutable'

//把 _INITIAL_STATE_ 转换为immutable的形式
// function changeToImmutable(data){

//     if(Object.prototype.toString.call(data) === "[object Object]"){
//         data = Map(data);
//         data = data.map((value, key) => {
//             data.set(key, changeToImmutable(value));
//         });

//         return data;
          
//     }else if(Object.prototype.toString.call(data) === "[object Array]"){

//         data = List(data).map(item => {
//             return changeToImmutable(item);
//         });

//         return data;
//     }else{
//         return data;
//     }

    
// }

// window['_INITIAL_STATE_'] = changeToImmutable(changeToImmutable);

