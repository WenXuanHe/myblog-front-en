import * as React from 'react';

/**
 * 密码输入Props
 */
export interface PasswordProps {
    password: string,
    onChange: (password: string) => void
}

export class FromControlPassword extends React.PureComponent<PasswordProps>{

    passwordChange = (e: any) => {
        this.props.onChange(e.currentTarget.value);
    }

    render() {
        return (
            <div className="u-password form-control">
                <label className="flex">
                    <span className="ml2em">密码: </span>
                    <input type='password' placeholder='请输入密码'
                        className="w160" value={this.props.password} onChange={this.passwordChange} />
                    <span className="col-3"></span>
                </label>
            </div>
        )
    }
}
