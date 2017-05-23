import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import './../styles/writer.scss'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'
import FileEditor from './editor/FileEditor'

let actions = {
    updateTitle:{
        type:'updateTitle',
        payload:''
    }
};
const mapStateToProps = (state, ownProps) => {
    return {
        articleList: state.writer.articleList,//文章列表
        currentArticle: state.login.currentArticle //用户信息，包含当前文集及当前文章
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateTitle:()=>{dispatch(actions.updateTitle, ownProps)}
    }
}

class Writer extends React.Component {

    static PropTypes = {
        articleList: PropTypes.array.isRequired,
        currentArticle: PropTypes.number.isRequired
    };

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
                    {
                        articleList.length ?
                             (<div className = 'col m-content'>
                                <header>
                                    <input type = 'text' value = {articleList[currentArticle].title} onChange={this.updateTitle}/>
                                </header>
                                < FileEditor ref = 'fileEditor' />
                            </div>)
                            : (<br/>)
                    }
                </div>

        )
    }

    updateTitle = (e)  =>{
        let {updateTitle, currentArticle} = this.props;
        actions.updateTitle.payload = {
            value:e.target.value,
            currentArticle:currentArticle
        };
        updateTitle();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
