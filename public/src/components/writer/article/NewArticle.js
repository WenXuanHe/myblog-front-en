import React, { PropTypes } from 'react'
import cs from 'classnames'
import {connect} from 'react-redux'

import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'

const actions={
    create:{type:'createNewArticle', payload:''},
    active:{type:'activeArticle', payload:''}
}

const mapStateToProps = (state, ownProps) => {
    return {
        articleList: state.writer.articleList,//文章列表
        currentArticle: state.writer.login.currentArticle //用户信息，包含当前文集及当前文章
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        create:()=>{dispatch(actions.create)},
        active:()=>{dispatch(actions.active)}
    }
}

class CreateArticle extends React.Component{

    static PropTypes = {
        articleList: PropTypes.array.isRequired,
        currentArticle: PropTypes.number.isRequired
    };

    constructor(){
        super(...arguments);

    }
    render(){

        let {articleList, currentArticle, create, active} = this.props;
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
        let {articleList, create} = this.props;
        actions.create.payload = this.addArticle(articleList.length);
        create();
    }
    active = (i)=>{
        let {active} = this.props;
        actions.active.payload = i;
        active();
    }
    addArticle = (len)=>{
        return {
            id:`add-${len}`,
            title:''
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
