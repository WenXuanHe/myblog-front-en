import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'
import FileEditor from './editor/FileEditor'
import utils from '$utils/index'
import { updateArticleInfo } from '$redux/actions/write'
import commonFetch from '$redux/commonFetch'

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
        updateArticleInfo: (data) => { dispatch(commonFetch(updateArticleInfo, data)) },

        syncArticleTitle: (data) => { dispatch(updateArticleInfo({ payload: data })) }
    }
}

class MyProject extends React.Component {

    static PropTypes = {
        workList: PropTypes.array.isRequired,
        currentArticleID: PropTypes.number.isRequired,
        currentWorkID: PropTypes.number.isRequired
    };

    render() {
        let { workList, currentWorkID, currentArticleID } = this.props;
        let workInfo = utils.getCurrentWorkInfo(workList, currentWorkID);
        this.articleInfo = utils.getCurrentArticleInfo(workInfo.articleList || [], currentArticleID);

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
                        <header>
                            <input type='text' value={this.articleInfo.title} onChange={this.asyncUpdateArticleInfo} onBlur={this.fetchUpdateArticleInfo} />
                        </header>
                        < FileEditor ref='fileEditor-key0' content={this.articleInfo.content} />
                        <div className="u-footer u-footer-skin">
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
    asyncUpdateArticleInfo = (e) => {
        let title = e.target.value;
        this.props.syncArticleTitle({
            data: {
                title
            }
        });
    }

    submitArticle = () => {
        var content = this.refs['fileEditor-key0'].getEditContent();
        var uploadFiles = this.refs['fileEditor-key0'].getFiles();
        this.fetchArticle({
            content,
            title: this.articleInfo.title,
            callBack: function(){
                alert('成功');
            }
        });

    }

    fetchArticle = ({ title = '', content = '', callBack=null }) => {
        let { updateArticleInfo, currentArticleID } = this.props;

        updateArticleInfo({
            url: '/writer/updateArticleInfo',
            fetchData: {
                title,
                articleID: currentArticleID,
                content
            },
            callBack: callBack
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

// export default connect(mapStateToProps, mapDispatchToProps)(Writer);
module.exports = connect(mapStateToProps, mapDispatchToProps)(MyProject);
