import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cs from 'classnames'

import mapDispatchToProps from '$redux/connect/mapDispatchToProps'
import Article from './Article'
import ArticleDelete from './ArticleDelete'
import actions from '$actions'

let mapStateToProps = require ('$redux/connect/mapStateToProps');

const articleMap = (dispatch, ownProps) => {
    return {
        createNewArticle: (workID) => { dispatch(actions.fetchCreateNewArticle(workID)) },
        deleteArticleById: (articleID) => {  dispatch(actions.deleteArticleById(articleID)) },

        changeActiveArticle: (data) => {
            dispatch({
                type:actionType.CHANGE_ACTIVE_ARTICLE,
                payload: data })
        },
    }
}

class CreateArticle extends React.Component {

    constructor() {
        super(...arguments);
        this.styles = {
            'u-article': true,
            'u-article-skin': true,
            'u-article-active': false
        };
    }
    //抽离出原本在map中的内容，避免在render中使用箭头函数
    articleItem = (key) => {
        let article = this.articleInfos[key];
        let current = this.props.currentArticleID === article.id;
        this.styles['u-article-active'] = current;
        
        return <Article styles={cs(this.styles)} onClick={this.changeActiveArticle} article={article}>
                {
                    current && <ArticleDelete onClick={this.deleteArticle} id={article.id} />  
                }
            </Article>
    }
    render() {
        let { articleLists, currentWorkID } = this.props;
        this.articleInfos = getter(articleLists, currentWorkID).toJS(); //from immutable to js
        return (
            <div className='m-add-article'>
                <div className='u-create' onClick={this.createArticle}>
                    <div className='field'>+新建文章</div>
                </div>
                <div className='u-article-list'>
                    {
                        articleInfos && Object.keys(articleInfos).map(this.articleItem)
                    }
                </div>
            </div>
        )
    }

    createArticle = () => {
        this.props.createNewArticle(this.props.currentWorkID);
    }

    deleteArticle = (articleID) => {
        this.props.deleteArticleById(articleID);
    }

    changeActiveArticle = (articleID) => {
        let { currentWorkID, changeActiveArticle } = this.props;
        changeActiveArticle({
            workID: currentWorkID,
            articleID
        });
    }

}

CreateArticle.PropTypes = {
    currentWorkID: PropTypes.number.isRequired,
    currentArticleID: PropTypes.number.isRequired,
    workList: PropTypes.number.isRequired
};

export default connect(mapStateToProps('writer', ['articleLists', 'currentArticleID', 'currentWorkID']), articleMap)(CreateArticle);

