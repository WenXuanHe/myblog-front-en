import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import './../styles/writer.scss'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'
import FileEditor from './editor/FileEditor'

const mapStateToProps = (state, ownProps) => {
    return {
        articleList: state.writer.articleList,//文章列表
        currentArticle: state.writer.login.currentArticle //用户信息，包含当前文集及当前文章
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {

    }
}
class Writer extends React.Component {

    static PropTypes = {
        articleList: PropTypes.array.isRequired,
        currentArticle: PropTypes.number.isRequired
    };

    constructor() {
        super(...arguments);

    }
    render() {
        let {articleList, currentArticle} = this.props;
        return (
            <div className = 'g-write flex'>
                <div className = 'col-5 m-work'>
                    <NewWorks />
                </div>
                <div className = 'col-4 m-article'>
                    <NewArticle />
                </div>
                <div className = 'col m-content'>
                    <header>
                        <input type = 'text' value = { articleList.length && articleList[currentArticle].title } />
                    </header>
                    < FileEditor ref = 'fileEditor' />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
