import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import cs from 'classnames'
import MyButton from '../../buttons'
import mapDispatchToProps from '$redux/connect/mapDispatchToProps'

let { getter } = require ('$utils/immutable-extend');
let mapStateToProps = require ('$redux/connect/mapStateToProps');

class Works extends React.Component{

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
                            <MyButton value='提交' key='Submit-01' className="btn-green" func={_.bind(this.submit, this)} />
                            <MyButton value='取消' key='Cancle-01' className="btn-dark" func={_.bind(this.reset, this)} />
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

    /**
     * 改变当前文集，拉取文集下信息
     * @param  {[type]} workID workID
     * @return {[type]}  articles
     */
    changeActiveWork = (workID) =>{

        this.props.changeActiveWork(workID);
    }

    createWork () {
        if(!this.state.increacing){
             this.setState({ increacing:true });
        }
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

Works.propTypes = {
    workList: PropTypes.array.isRequired,
    currentWorkID: PropTypes.number.isRequired
};

export default connect( mapStateToProps('writer',  ['workList', 'currentWorkID']) ,  mapDispatchToProps.work)(Works);
