import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'
import FileEditor from './editor/FileEditor'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import persistence from '$helper/persistence'
import mapDispatchToProps from '$redux/connect/mapDispatchToProps'

let { isMap, getter } = require('$utils/immutable-extend');
let mapStateToProps = require ('$redux/connect/mapStateToProps');

//持久化页面渲染信息
persistence();

class Writer extends React.Component {

    constructor(){
        super(...arguments);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {

        let { articleLists, currentWorkID, currentArticleID } = this.props;
        this.articleInfo = isMap(articleLists) && articleLists.getIn([currentWorkID.toString(), currentArticleID.toString()]) || null;

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
                                value={getter(this.articleInfo, 'title')}
                                onChange={this.UpdateTitle}
                                onBlur={this.fetchUpdateArticleInfo} />
                        </header>
                        < FileEditor ref='fileEditor-key0' content={getter(this.articleInfo, 'content')} />
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

        this.fetchArticle({
            content,
            title: getter(this.articleInfo, 'title')
        });
    }

    /**
     * 失去焦点时存库
     */
    fetchUpdateArticleInfo = (e) => {

        let title = e.target.value;
        if(this.articleInfo.get('title') === title) return;

        let { updateArticleInfo } = this.props;
        this.fetchArticle({
            title
        });
    }

    /**
     * title{* string}
     * content{* string}
     */
    fetchArticle = (params) => {
        let { updateArticleInfo, currentArticleID } = this.props;
        updateArticleInfo({
            ...params,
            articleID: currentArticleID
        });
    }
}

Writer.propTypes = {
    workList: PropTypes.array.isRequired,
    currentArticleID: PropTypes.number.isRequired,
    currentWorkID: PropTypes.number.isRequired
};

export default connect( mapStateToProps('writer', ['articleLists', 'currentArticleID', 'currentWorkID']), mapDispatchToProps.writer)(Writer);
