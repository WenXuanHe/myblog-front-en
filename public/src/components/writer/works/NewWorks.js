import React, { PropTypes } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import cs from 'classnames'
import timestamp from '$helper/timestamp'
import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'
import actions from '$redux/actions/write'



/**
 * 去数据库新建文集
 */
const fetchCreateNewWork = (actions, title) => (dispatch)=>{
    //先发送一个action
    dispatch(actions.createNewWork({}));
    return axios.post('/writer/createNewWork', {
        title:title
    }).then(function(res){
        let result = res.data.result;
        dispatch(actions.createNewWork({
            status:'success',
            payload:result
        }));
    }).catch(function(e){
         dispatch(actions.createNewWork({
            status:'error',
            payload:e
        }));
    })
}

const fetchChangeActiveWork = (actions, workID) => (dispatch) => {

    dispatch(actions.changeActiveWork({}));
    return axios.post('/writer/changeActiveWork', {
        workID:workID
    }).then(function(res){
        let result = res.data.result;
        dispatch(actions.createNewWork({
            status:'success',
            payload:result
        }));
    }).catch(function(e){
         dispatch(actions.createNewWork({
            status:'error',
            payload:e
        }));
    })
}

const mapStateToProps = (state, ownProps) => {
    return {
        workList:state.writer.workList, //文件夹列表
        currentWork: state.writer.currentWork //当前文集的id值
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        createNewWork: (title)=>{dispatch(fetchCreateNewWork(actions, title))},

        changeActiveWork:(i)=>{dispatch(fetchChangeActiveWork(actions, i))}
    }
}

class Works extends React.Component{

    static PropTypes = {
        workList: PropTypes.array.isRequired,
        currentWork: PropTypes.number.isRequired
    };

    constructor(){
        super(...arguments);
        this.state = {
            newWorkName:'',
            increacing:false
        };
    }

    render(){
        let {workList, currentWork} = this.props;
        let styles = {
            'u-work':true,
            'u-work-active':false
        };
        return (
            <div className='m-add-files'>
                <div className='u-create' onClick={_.bind(this.createWork, this)}>
                    <div className='field'>+新建文集</div>
                </div>
                { this.state.increacing &&
                    <div className='u-file-name'>
                        <div className='field'>
                            <input type='text' placeholder='请输入文集名'
                            onChange={(e) => {this.setState({newWorkName: e.target.value})}} 
                            value={this.state.newWorkName} />
                        </div>
                        <div className='field form'>
                            <Submit value='提交' func={_.bind(this.submit, this)} />
                            <Cancle value='取消' func={_.bind(this.reset, this)} />
                        </div>
                    </div>
                }
                {
                    workList.map((item) =>{
                        styles['u-work-active'] = currentWork === item.id;
                        return (
                            <div className={cs(styles)} data-id={item.id} onClick={this.changeActiveWork.bind(this,i)}>
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
    
    createWork () {
        if(!this.state.increacing){
             this.setState({
                increacing:true
            });
        }
    }

    /**
     * todo: currentWork存放在浏览器缓存里
     */
    changeActiveWork (i) {
        //
        let {changeActiveWork} = this.props;
        changeActiveWork();
    }

    submit () {
        var result = this.props.createNewWork(this.state.newWorkName);
        this.reset();
    }

    reset () {
        this.setState({
            newWorkName:'',
            addWork:false
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Works);
