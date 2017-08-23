import * as React from 'react';

/**
 * 密码输入Props
 */
export interface FromControlPasswordProps{
    password: string,
    handleChange: (e:any) => void
}

/**
 * 
 * @param props interface FromControlPasswordProps
 */
export const FromControlPassword = (props: FromControlPasswordProps): any => {
    let {password, handleChange} = props;
    return (
        <div className="u-password form-control">
            <label className="flex">
                <span className="ml2em">密码: </span>
                <input type='password' placeholder='请输入密码'
                    className="w160" value={password} onChange={handleChange} />
                <span className="col-3"></span>
            </label>
        </div>
    )
}