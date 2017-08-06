import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cs from 'classnames'
import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'
import actions from '$actions'

let { getter } = require ('$utils/immutable-extend');
let actionType = require('$redux/actionType');

const mapStateToProps = (state, ownProps) => {
    return {
        articleLists: getter(state.writer, "articleLists"),
        currentArticleID: getter(state.writer, 'currentArticleID'),
        currentWorkID: getter(state.writer, 'currentWorkID'),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
        this.state = {
            hoverElementID: -1
        }
    }

    render() {
        let { articleLists, currentWorkID, currentArticleID } = this.props;
        let articleInfos = getter(articleLists, currentWorkID);
        let styles = {
            'u-article': true,
            'u-article-skin': true,
            'u-article-active': false
        };
        return (
            <div className='m-add-article' onMouseLeave={() => this.setState({ hoverElementID: -1 })}>
                <div className='u-create' onClick={this.createArticle}>
                    <div className='field'>+新建文章</div>
                </div>
                <div className='u-article-list'>
                    {
                        articleInfos && Object.keys(articleInfos.toJS()).map((key) => {
                            let item = getter(articleInfos, key);
                            let id = getter(item, 'id');
                            let title = getter(item, 'title');
                            let workID = getter(item, 'workID');
                            styles['u-article-active'] = currentArticleID === id;
                            return (
                                <div className={cs(styles)} key={"article-" +  id}
                                    data-id={ workID }
                                    onClick={this.changeActiveArticle.bind(this, id)}
                                    onMouseEnter={() => this.setState({ hoverElementID: id })}>

                                    <div className='field z-unit flex'>
                                        <span className='z-file-logo'>
                                            <i className="iconfont">&#xe6f4;</i>
                                        </span>
                                        <span className="col z-file-title">{title || '无标题文章'}</span>
                                        {
                                            this.state.hoverElementID === id &&
                                            <span className="z-file-logo" onClick={this.deleteArticle.bind(this, id)}>
                                                <i className="iconfont">&#xe6f2;</i>
                                            </span>
                                        }
                                    </div>
                                </div>
                            )
                        })
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

// export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

