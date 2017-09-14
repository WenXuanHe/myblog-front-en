import * as React from 'react'
import { storeType } from '$redux/store/data'
import { connect, Dispatch } from 'react-redux'
import * as cs from 'classnames'
import MyButton from '../../buttons'
import Increace from './Increace'
import Work from './Work'
import actions from '$actions/index'


interface Props {
    workList: Array<any>,
    currentWorkID: number,
    createNewWork: (title: string) => void
    changeActiveWork: (workID: number) => void
}

interface States {
    increacing: boolean
}
/**
 * 从store中拿到的状态
 * @param param0 
 */
const mapStateToProps = ({writer}: storeType) => {
    return {
        workList: writer.getIn(['workList']),
        currentWorkID: writer.getIn(['currentWorkID'])
    }
}

const workMap = (dispatch: Dispatch<any>, ownProps) => {
    return {
        createNewWork: (title: string) => { dispatch(actions.fetchCreateNewWork(title)) },
        changeActiveWork: (workID: number) => { dispatch(actions.fetchChangeActiveWork(workID)) }
    }
}

class WorkList extends React.Component<Props, States>{

    styles:{
        'u-work': boolean,
        'u-work-active': boolean
    };
    newWorkName:string;

    constructor() {
        super();

        this.state = {
            increacing : false
        };
        this.newWorkName = "";
        this.styles = {
            'u-work': true,
            'u-work-active': false
        };
    }

    render() {
        let { workList, currentWorkID } = this.props;
        return (
            <div className='m-add-files'>
                <div className='u-create' onClick={this.createWork}>
                    <div className='field'>+新建文集</div>
                </div>
                {this.state.increacing &&
                    <Increace onChange={this.setNewWorkName}>
                        <div className='field form'>
                            <MyButton value='提交' key='Submit-01' className="btn-green" func={this.submit} />
                            <MyButton value='取消' key='Cancle-01' className="btn-dark" func={this.reset} />
                        </div>
                    </Increace>
                }
                {
                    workList && workList.map((item) => {
                        this.styles['u-work-active'] = +this.props.currentWorkID === item.id;
                        return <Work key={item.id} styles={cs(this.styles)} work={item} onClick={this.changeActiveWork} />
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        // 首次渲染后就发起第一次请求
        this.changeActiveWork(+this.props.currentWorkID);
    }

    setNewWorkName = (name) => {
        this.newWorkName = name;
    }

    /**
     * 改变当前文集，拉取文集下信息
     * @param  {[type]} workID workID
     * @return {[type]}  articles
     */
    changeActiveWork = (workID) => {
        this.props.changeActiveWork(workID);
    }

    createWork = () => {
        if (!this.state.increacing) {
            this.setState({ increacing: true });
        }
    }

    submit = () => {
        var result = this.props.createNewWork(this.newWorkName);
        this.reset();
    }

    reset = () => {
        this.setState({
            increacing: false
        });
    }
}

export default connect(mapStateToProps, workMap)(WorkList);
