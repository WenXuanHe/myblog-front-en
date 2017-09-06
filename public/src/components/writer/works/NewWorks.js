import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import cs from 'classnames'
import MyButton from '../../buttons'
import mapDispatchToProps from '$redux/connect/mapDispatchToProps'
import Increace from './Increace'
import Work from './Work'
import actions from '$actions'

let mapStateToProps = require ('$redux/connect/mapStateToProps');

const workMap = (dispatch, ownProps) =>{
    return {
        createNewWork: (title)=>{dispatch(actions.fetchCreateNewWork(title))},
        changeActiveWork:(workID)=>{dispatch(actions.fetchChangeActiveWork(workID))}
    }
}

class Works extends React.Component{

    constructor(){
        super(...arguments);
        this.state = {
            newWorkName:'',
            increacing:false
        };
        this.styles = {
            'u-work':true,
            'u-work-active':false
        };
    }

    render(){
        let {workList, currentWorkID} = this.props;
        return (
            <div className='m-add-files'>
                <div className='u-create' onClick={_.bind(this.createWork, this)}>
                    <div className='field'>+新建文集</div>
                </div>
                { this.state.increacing && 
                    <increace onChange={this.setNewWorkName} newWorkName={this.state.newWorkName} >
                        <div className='field form'>
                            <MyButton value='提交' key='Submit-01' className="btn-green" func={this.submit} />
                            <MyButton value='取消' key='Cancle-01' className="btn-dark" func={this.reset} />
                        </div>
                    </increace>
                }
                {
                    workList.map(this.renderWorkItem)
                }
            </div>
        )
    }

    componentDidMount(){
        // 首次渲染后就发起第一次请求
        this.changeActiveWork(+this.props.currentWorkID);
    }

    setNewWorkName = (name)=>{
        this.setState({newWorkName: name})
    }

    renderWorkItem = (item) => {
        this.styles['u-work-active'] = +this.props.currentWorkID === item.id;
        return <Work styles={cs(this.styles)} work={item} onClick={this.changeActiveWork}/>
    }

    /**
     * 改变当前文集，拉取文集下信息
     * @param  {[type]} workID workID
     * @return {[type]}  articles
     */
    changeActiveWork = (workID) =>{

        this.props.changeActiveWork(workID);
    }

    createWork = () => {
        if(!this.state.increacing){
             this.setState({ increacing:true });
        }
    }

    submit = () => {
        var result = this.props.createNewWork(this.state.newWorkName);
        this.reset();
    }

    reset = () => {
        this.setState({
            increacing:false
        });
    }
}

Works.propTypes = {
    workList: PropTypes.array.isRequired,
    currentWorkID: PropTypes.number.isRequired
};

export default connect( mapStateToProps('writer',  ['workList', 'currentWorkID']) ,  workMap)(Works);
