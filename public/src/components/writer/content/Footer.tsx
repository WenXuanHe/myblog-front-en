import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props{
    onClick:() => void
}

const Footer = (props:Props) => {
    return (
        <div className="u-footer u-footer-skin">
            <Link to="/writer/index" className="ml10">返回文章列表</Link>
            <a href='javascript:void(0);' className="btn btn-green" onClick={props.onClick}> 提交 </a>
        </div>
    )
}

export default Footer