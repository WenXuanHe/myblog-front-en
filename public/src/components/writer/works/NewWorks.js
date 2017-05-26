// import React, { PropTypes } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

const actions = {
    submit:{type:'createNewWork', payload:''},
    changeActiveWork:{type:'changeActiveWork', payload:''}
};

const mapStateToProps = (state, ownProps) => {
    return {
        workList:state.writer.workList, //文件夹列表
        currentWork: state.login.currentWork //用户信息，包含当前文集及当前文章
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        submit: ()=>{dispatch(actions.submit)}
    }
}

class CreateProject extends React.Component{

    static PropTypes = {
        workList: PropTypes.array.isRequired,
        currentWork: PropTypes.number.isRequired
    };

    constructor(){
        super(...arguments);
        this.state = {
            newWorkName:'',
            addWork:false
        };
    }
    render(){
        let {workList, currentWork} = this.props;
        let styles = {
            'u-article':true,
            'u-article-active':false
        };
        return (
            <div className='m-add-files'>
                <div className='u-create' onClick={this.create}>
                    <div className='field'>+新建文集</div>
                </div>
                { this.state.addWork &&
                    <div className='u-file-name'>
                        <div className='field'>
                            <input type='text' placeholder='请输入文集名'
                            onChange={this.fileNameSync} value={this.state.newWorkName} />
                        </div>
                        <div className='field form'>
                            <Submit value='提交' func={this.submit} />
                            <Cancle value='取消' func={this.reset} />
                        </div>
                    </div>
                }

                {
                    workList.map((item, i) =>{
                        styles['u-article-active'] = currentWork === i;
                        return (
                            <div className={cs(styles)}
                             data-id={item.id} onClick={this.active.bind(this,i)}>
                                <div className='field z-unit flex'>
                                    <span className='z-file-logo'>
                                        <i className="iconfont">&#xe6f4;</i>
                                    </span>
                                    <span className="col z-file-title">{item.title}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    fileNameSync = (e) => {

        this.setState({
            newWorkName: e.target.value
        });
    }

    create = () => {
        let { addWork } = this.state;

        if(!addWork){
             this.setState({
                addWork:true
            });
        }
    }

    active = (i)=>{
        let {changeActiveWork} = this.props;
        actions.changeActiveWork.payload = i;
        changeActiveArticle();
    }

    submit = () => {
        let {submit} = this.props;
        actions.submit.payload = {
            title: this.state.newWorkName,
            id:timestamp(),
            articleList:[],
        };
        submit();
        this.reset();
    }

    reset = () => {
        this.setState({
            newWorkName:'',
            addWork:false
        });
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
module.exports =  connect(mapStateToProps, mapDispatchToProps)(CreateProject);
