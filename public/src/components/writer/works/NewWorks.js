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

/**
 * 通过workID拉取文章列表
 * @param {*workID} workID 
 */
const fetchArticlesByworkID = (workID) => {
    return axios.get('/base/queryArticlesByworkId', {
        params:{
            workID:workID
        }
    });
}

/**
 * 改变文件，拉取当前文集下的所有文章
 * @param {*} actions 
 * @param {*} workID 
 */
const fetchChangeActiveWork = (actions, workID) => (dispatch) => {

    dispatch(actions.changeActiveWork({}));

    fetchArticlesByworkID(workID).then(function(res){
        let result = res.data.result;
        dispatch(actions.changeActiveWork({
            status:'success',
            payload:{
                workID:workID,
                articleList:result
            }
        }));
    }).catch(function(e){
         dispatch(actions.changeActiveWork({
            status:'error',
            payload:e
        }));
    })
}

const mapStateToProps = (state, ownProps) => {
    return {
        workList:state.writer.workList, //文件夹列表
        currentWorkID: state.writer.currentWorkID //当前文集的id值
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        createNewWork: (title)=>{dispatch(fetchCreateNewWork(actions, title))},

        changeActiveWork:(workID)=>{dispatch(fetchChangeActiveWork(actions, workID))}
    }
}

class Works extends React.Component{

    static PropTypes = {
        workList: PropTypes.array.isRequired,
        currentWorkID: PropTypes.number.isRequired
    };

    constructor(){
        super(...arguments);
        this.state = {
            newWorkName:'',
            increacing:false
        };
    }

    render(){
        let {workList, currentWorkID} = this.props;
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
                            <Submit value='提交' key='Submit-01' func={_.bind(this.submit, this)} />
                            <Cancle value='取消' key='Cancle-01' func={_.bind(this.reset, this)} />
                        </div>
                    </div>
                }
                {
                    workList.map((item) =>{
                        styles['u-work-active'] = +currentWorkID === item.id;
                        return (
                            <div className={cs(styles)} key={ "article-"+ item.id } onClick={this.changeActiveWork.bind(this,item.id)}>
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
    
    componentDidMount(){
        // 首次渲染后就发起第一次请求
        this.changeActiveWork(+this.props.currentWorkID);
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
    changeActiveWork (workID) {
        
        let {changeActiveWork} = this.props;
        changeActiveWork(workID);
    }

    submit () {
        var result = this.props.createNewWork(this.state.newWorkName);
        this.reset();
    }

    reset () {
        this.setState({
            increacing:false
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Works);
