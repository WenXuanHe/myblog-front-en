import React from 'react'

class Work extends React.PureComponent{

    changeActiveWork = () => {
        this.props.onClick(this.props.work.id);
    }
    render(){
        return (
            <div className={this.props.styles} key={ "article-"+ this.props.work.id } onClick={this.changeActiveWork}>
                <div className='field z-unit flex'>
                    <span className='z-file-logo'>
                        <i className="iconfont">&#xe6f4;</i>
                    </span>
                    <span className="col z-file-title">{this.props.work.title}</span>
                </div>
            </div>
        )
    }
}

export default Work;