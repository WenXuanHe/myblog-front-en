
import * as React from 'react';
import Submit from '../buttons/submit';

export interface FromControlSubmitProps {
    login: boolean,
    loginFunc: () => void,
    switchLoginFunc: () => void,
    registorFunc: () => void
}

/**
 * 
 * @param props interface FromControlSubmitProps
 */
export const FromControlSubmit = (props: FromControlSubmitProps): any => {

    let { login, loginFunc, registorFunc, switchLoginFunc } = props;

    return (
        <div className="u-submit form-control">
            {
                login ? <Submit func={loginFunc} value={'登录'} /> : <Submit func={registorFunc} value={'注册'} />
            }
            <a href="javascript:void(0)" className="switch-registor" onClick={switchLoginFunc}>{login ? "去注册" : "去登录"}</a>
        </div>
    )
}