// import React, { PropTypes } from 'react'
// import {connect} from 'react-redux'

// import './../styles/writer.scss'
// import NewWorks from './writer/works/NewWorks.jsx'
// import NewArticle from './writer/article/NewArticle.jsx'
// import FileEditor from './editor/FileEditor.jsx'
let React = require('react');
let PropTypes = React.PropTypes;
let connect = require('react-redux').connect;
let NewWorks = require('./writer/works/NewWorks').default;
let NewArticle = require('./writer/article/NewArticle');
let FileEditor = require('./editor/FileEditor');


let actions = {
    updateTitle:{type:'updateTitle',payload:''}
};

const mapStateToProps = (state, ownProps) => {
    let {workList, currentArticle, currentWork} = state.writer;
    return {
        workList,//文章列表
        currentArticle, //用户信息，包含当前文集及当前文章
        currentWork
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateTitle:()=>{dispatch(actions.updateTitle, ownProps)}
    }
}

class MyProject extends React.Component {

    static PropTypes = {
        workList: PropTypes.array.isRequired,
        currentArticle: PropTypes.number.isRequired,
        currentWork: PropTypes.number.isRequired
    };

    render() {

        let {workList, currentWork, currentArticle} = this.props;
        if(currentWork !== -1){
            currentWork = workList.length ? workList[0].id : -1;
        }
        let articleList = workList[currentWork] || [];
        if(currentArticle !== -1){
            currentArticle = articleList.length ? articleList[0].id : -1;
        }

        return (

                <div className = 'g-write flex'>
                    <div className = 'col-5 m-work'>
                        <NewWorks key='NewWorks-01' />
                    </div>
                    <div className = 'col-4 m-article'>
                        <NewArticle key='NewArticle-01' />
                    </div>
                    {
                        articleList.length ?
                             (<div className = 'col m-content'>
                                <header>
                                    <input type = 'text' value = {articleList[currentArticle].title} onChange={this.updateTitle}/>
                                </header>
                                {/*< FileEditor ref = 'fileEditor' />*/}
                            </div>)
                            : (<br/>)
                    }
                </div>

        )
    }
    /**
     * 一个articleID即可
     */
    updateTitle = (e)  =>{
        let {updateTitle, currentArticle, currentWork} = this.props;
        actions.updateTitle.payload = {
            value:e.target.value,
            currentArticle,
            currentWork
        };
        updateTitle();
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Writer);
module.exports = connect(mapStateToProps, mapDispatchToProps)(MyProject);
    