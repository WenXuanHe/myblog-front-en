import * as React from 'react';
/**
 * 用户名输入组件Props
 */
export interface FromControlUserNameProps{
    judgeRepeat: () => void,
    tip:{
        className:string, 
        isRepeat:boolean, 
        value:string
    },
    userName: string
}

/**
 * 用户名输入组件
 * @param  {[object]} props [description]
 * {props.judgeRepeat} 判断重复
 * {props.tip} 是否重复的信息
 * {userName} 用户名
 * @return {[type]}       [description]
 */
export const FromControlUserName = (props:FromControlUserNameProps):any => {
    let {judgeRepeat, tip, userName} = props;
    return (
        <div className="u-userName form-control">
            <label className="flex">
                <span className="ml2em">用户名: </span>
                <input type='text' name='userName' placeholder='请输入用户名'
                className="w160" value={userName} onChange={judgeRepeat} />
                <span className={`col-3 ${tip.className}`}>{tip.isRepeat ? tip.value : ""}</span>
            </label>
        </div>
    )
}