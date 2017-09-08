import * as React from 'react';

interface Props{
    className:string,
    func:() => any,
    value: string
}
export default (props:Props) => {
    let { className, func, value} = props;
     return (
            <a className={ "btn " + className} href="javascript:void(0);" onClick={func}>{value}</a>
        )
}
