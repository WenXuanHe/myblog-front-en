import * as  React from 'react'


interface Props{
    onClick: (id:string|number) => void,
    article:any,
    styles: string
}

class Article extends React.PureComponent<Props>{

    changeActiveArticle = () => {
        this.props.onClick(this.props.article.get('id'));
    }

    render(){
        return (
            <div className={this.props.styles} key={this.props.article.get('id')} onClick={this.changeActiveArticle}>
                <div className='field z-unit flex'>
                    <span className='z-file-logo'>
                        <i className="iconfont">&#xe6f4;</i>
                    </span>
                    <span className="col z-file-title">{this.props.article.get('title') || '无标题文章'}</span>
                    {
                        this.props.children
                    }
                </div>
            </div>
    
        )
    }
}

export default Article;