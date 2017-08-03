import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'
import FileEditor from './editor/FileEditor'
import utils from '$utils/index'
// import { updateArticleInfo } from '$redux/actions/write'
// import commonFetch from '$redux/commonFetch'
import actions from '$actions'
import actionType from "$redux/actionType"

const mapStateToProps = (state, ownProps) => {

    let { workList, currentArticleID, currentWorkID } = state.writer;
    return {
        workList,//文章列表
        currentArticleID, //用户信息，包含当前文集及当前文章
        currentWorkID
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateArticleInfo: (data) => { dispatch(actions.updateArticleInfo(data)) },
        //同步更新题目
        UpdateTitle: (title) => {
            dispatch({
                type: actionType.UPDATE_TITLE,
                payload: title
            })
        }
    }
}

class MyProject extends React.Component {

    render() {
        let { workList, currentWorkID, currentArticleID } = this.props;
        let workInfo = utils.getCurrentWorkInfo(workList, currentWorkID);
        if (!workInfo) {
            this.articleInfo = null;
        } else {
            this.articleInfo = utils.getCurrentArticleInfo(workInfo.articleList || [], currentArticleID);
        }

        return (
            <div className='g-write flex'>
                <div className='col-5 m-work'>
                    <NewWorks key='NewWorks-01' />
                </div>
                <div className='col-4 m-article'>
                    <NewArticle key='NewArticle-01' />
                </div>
                {
                    this.articleInfo &&
                    <div className='col m-content'>
                        <header style={{ 'marginBottom': '2px' }}>
                            <input type='text'
                                value={this.articleInfo.title}
                                onChange={this.UpdateTitle}
                                onBlur={this.fetchUpdateArticleInfo} />
                        </header>
                        < FileEditor ref='fileEditor-key0' content={this.articleInfo.content} />
                        <div className="u-footer u-footer-skin">
                            <Link to="/index" className="ml10">返回文章列表</Link>
                            <a href='javascript:void(0);' className="btn btn-green" onClick={this.submitArticle}> 提交 </a>
                        </div>
                    </div>
                }
            </div>
        )
    }
    /**
     * 同步本地中的数据
     */
    UpdateTitle = (e) => {
        this.props.UpdateTitle(e.target.value);
    }

    submitArticle = () => {
        var content = this.refs['fileEditor-key0'].getEditContent();
        var uploadFiles = this.refs['fileEditor-key0'].getFiles();
        this.props.updateArticleInfo({ content, title: this.articleInfo.title });
    }

    fetchArticle = ({ title = '', content = ''}) => {
        let { updateArticleInfo, currentArticleID } = this.props;
        updateArticleInfo({
            title,
            articleID: currentArticleID,
            content
        });
    }

    /**
     * 失去焦点时存库
     */
    fetchUpdateArticleInfo = (e) => {
        let title = e.target.value;
        let { updateArticleInfo, currentArticleID } = this.props;
        this.fetchArticle({
            content: this.articleInfo.content,
            title
        });
    }

}

MyProject.propTypes = {
    workList: PropTypes.array.isRequired,
    currentArticleID: PropTypes.number.isRequired,
    currentWorkID: PropTypes.number.isRequired
};

// export default connect(mapStateToProps, mapDispatchToProps)(Writer);
module.exports = connect(mapStateToProps, mapDispatchToProps)(MyProject);
