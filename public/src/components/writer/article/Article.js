import React from 'react'


class Article extends React.PureComponent{

    changeActiveArticle = () => {
        this.props.onClick(this.props.article.id);
    }

    render(){
        return (
            <div className={this.props.styles} key={this.props.article.id} onClick={this.changeActiveArticle}>
                <div className='field z-unit flex'>
                    <span className='z-file-logo'>
                        <i className="iconfont">&#xe6f4;</i>
                    </span>
                    <span className="col z-file-title">{this.props.article.title || '无标题文章'}</span>
                    {
                        this.props.children
                    }
                </div>
            </div>
    
        )
    }
}

export default Article;