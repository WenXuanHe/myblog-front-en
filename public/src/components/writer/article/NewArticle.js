// import React, { PropTypes } from 'react'
// import cs from 'classnames'
// import {connect} from 'react-redux'

// import timestamp from '$helper/timestamp'
// import Submit from '../../buttons/submit.jsx'
// import Cancle from '../../buttons/cancle.jsx'


let React = require('react');
let PropTypes = React.PropTypes;
let connect = require('react-redux').connect;
let cs = require('classnames');
let timestamp = require('../../../helper/timestamp');
let Submit = require('../../buttons/submit.js');
let Cancle = require('../../buttons/cancle.js');

const actions={
    createNewArticle:{type:'createNewArticle', payload:''},
    changeActiveArticle:{type:'changeActiveArticle', payload:''}
}

const mapStateToProps = (state, ownProps) => {
    return {
        workList: state.writer.workList,
        currentArticle: state.login.currentArticle,
        currentWork: state.login.currentWork
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        createNewArticle:()=>{dispatch(actions.createNewArticle)},
        changeActiveArticle:()=>{dispatch(actions.changeActiveArticle)}
    }
}

class CreateArticle extends React.Component{

    static PropTypes = {
        currentWork: PropTypes.number.isRequired,
        currentArticle: PropTypes.number.isRequired,
        workList: PropTypes.number.isRequired
    }
    render(){

        let {workList, currentWork, currentArticle} = this.props;
        let articleList = (workList.length && workList[currentWork])
            ? workList[currentWork].articleList : [];
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
                             data-id={item.workID} onClick={this.active.bind(this,i)}>
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
        let {workList, currentWork, createNewArticle} = this.props;
        let articleList = (workList.length && workList[currentWork])
            ? workList[currentWork].articleList : [];
        actions.createNewArticle.payload = this.addArticle(articleList.length);
        createNewArticle();
    }
    active = (i)=>{
        let {changeActiveArticle} = this.props;
        actions.changeActiveArticle.payload = i;
        changeActiveArticle();
    }
    addArticle = (len)=>{
        return {
            id:timestamp(),
            title:'',
            content:'',
            files:''
        }
    }

}

// export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

