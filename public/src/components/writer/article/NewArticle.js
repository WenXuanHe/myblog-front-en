import React, { PropTypes } from 'react'
import cs from 'classnames'
import {connect} from 'react-redux'

import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'

const actions={
    createNewArticle:{type:'createNewArticle', payload:''},
    changeActiveArticle:{type:'changeActiveArticle', payload:''}
}

const mapStateToProps = (state, ownProps) => {
    return {
        articleList: state.writer.articleList,//文章列表
        currentArticle: state.login.currentArticle //用户信息，包含当前文集及当前文章
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        createNewArticle:()=>{dispatch(actions.createNewArticle)},
        changeActiveArticle:()=>{dispatch(actions.changeActiveArticle)}
    }
}

class CreateArticle extends React.Component{

    static PropTypes = {
        articleList: PropTypes.array.isRequired,
        currentArticle: PropTypes.number.isRequired
    }
    render(){

        let {articleList, currentArticle} = this.props;
        let styles = {
            'u-article':true,
            'u-article-active':false
        };
        return (
            <div className='m-add-article'>
                <div className='u-create' onClick={this.create}>
                    <div className='field'>+新建文章</div>
                </div>
                <div className='u-article-list'>
                {
                    articleList.map((item, i) => {
                        styles['u-article-active'] = currentArticle === i;
                        return (
                            <div className={cs(styles)}
                             data-id={item.id} onClick={this.active.bind(this,i)}>
                                <div className='field z-unit flex'>
                                    <span className='z-file-logo'>
                                        <i className="iconfont">&#xe6f4;</i>
                                    </span>
                                    <span className="col z-file-title">{item.title || '无标题文章'}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    create = () => {
        let {articleList, createNewArticle} = this.props;
        actions.createNewArticle.payload = this.addArticle(articleList.length);
        createNewArticle();
    }
    active = (i)=>{
        let {changeActiveArticle} = this.props;
        actions.changeActiveArticle.payload = i;
        changeActiveArticle();
    }
    addArticle = (len)=>{
        return {
            id:`add-${len}`,
            title:'',
            content:'',
            files:''
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
