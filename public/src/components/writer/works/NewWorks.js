import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {connect} from 'react-redux'

import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'

const actions = {
    submit:{type:'createNewWork'}
};

const mapStateToProps = (state, ownProps) => {
    return {
        workList:state.writer.workList, //文件夹列表
        currentWork: state.login.currentWork //用户信息，包含当前文集及当前文章

    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        submit:()=>{dispatch(actions.submit)}
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
        let {workList, currentWork, submit} = this.props;

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
            </div>
        )
    }

    fileNameSync = (e) => {
        let newWorkName = e.target.value;
        this.setState({
            newWorkName
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

    submit = () => {
        submit();
    }

    reset = () => {
        this.setState({
            newWorkName:'',
            addWork:false
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
