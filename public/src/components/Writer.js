// import React, { PropTypes } from 'react'
// import {connect} from 'react-redux'

// import './../styles/writer.scss'
// import NewWorks from './writer/works/NewWorks.jsx'
// import NewArticle from './writer/article/NewArticle.jsx'
// import FileEditor from './editor/FileEditor.jsx'
let React = require('react');
let PropTypes = React.PropTypes;
let connect = require('react-redux').connect;
let NewWorks = require('./writer/works/NewWorks.js');
let NewArticle = require('./writer/article/NewArticle.js');
let FileEditor = require('./editor/FileEditor.js');


let actions = {
    updateTitle:{
        type:'updateTitle',
        payload:''
    }
};
const mapStateToProps = (state, ownProps) => {
    return {
        workList: state.writer.workList,//文章列表
        currentArticle: state.login.currentArticle, //用户信息，包含当前文集及当前文章
        currentWork: state.login.currentWork
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateTitle:()=>{dispatch(actions.updateTitle, ownProps)}
    }
}

class Writer extends React.Component {

    static PropTypes = {
        workList: PropTypes.array.isRequired,
        currentArticle: PropTypes.number.isRequired,
        currentWork: PropTypes.number.isRequired
    };

    render() {
        let {workList, currentWork, currentArticle} = this.props;
        let articleList = (workList.length && workList[currentWork])
            ? workList[currentWork].articleList : [];

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
module.exports = connect(mapStateToProps, mapDispatchToProps)(Writer);
