import * as React from 'react'

interface Props{
    styles:any,
    key:number,
    id:number,
    title:string,
    children:any,
    onClick: (id:number) => void
}

class Work extends React.PureComponent<Props>{

    changeActiveWork = () => {
        this.props.onClick(this.props.id);
    }
    render(){
        return (
            <div className={this.props.styles} onClick={this.changeActiveWork}>
                <div className='field z-unit flex'>
                    <span className='z-file-logo'>
                        <i className="iconfont">&#xe6f4;</i>
                    </span>
                    <span className="col z-file-title">{this.props.title}</span>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default Work;