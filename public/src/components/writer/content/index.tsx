import * as React from 'react'
import { getter } from '$utils/immutable-extend'
import { dataStates } from '$redux/store/data'
import actions from '$actions/index'
import {ActionTypes} from '$redux/actionType/index'
import { connect, Dispatch } from 'react-redux'
import Title from './Title'
import Footer from './Footer'
import Editor from '../../editor/Editor'
import FileUpload from '../../upload/FileUpload'

interface Props {
    title: string,
    content:string,
    currentArticleID:number|string,
    updateArticleInfo: (data:any) => void,
    updateTitle: (title:string) => void
}

/**
 * 从store中拿到的状态
 * @param param0 
 */
const mapStateToProps = (data: dataStates) => {
    let currentWorkID = data.getIn(['writer', 'currentWorkID']).toString();
    let currentArticleID = data.getIn(['writer', 'currentArticleID']).toString();
    let title = data.getIn(['writer', 'articleLists', currentWorkID, currentArticleID, 'title']);
    let content =  data.getIn(['writer', 'articleLists', currentWorkID, currentArticleID, 'content'])
    return {
        title,
        content,
        currentArticleID
    }
}

/**
 * store中要用到的方法
 * @param dispatch 
 */
const mapDispatchToProps = (dispatch:Dispatch<any>) => {
    return {
        updateArticleInfo: (data:any) => { dispatch(actions.updateArticleInfo(data)) },
        //同步更新题目
        updateTitle: (title:string) => {
            dispatch({
                type: ActionTypes.UPDATE_ARTICLE_INFO,
                payload: {title}
            })
        }
    }
}

class Content extends React.Component<Props> {

    //由于props不能修改，每次都同步到store比较费性能，所以将内容放在content变量
    content:string;
    files: Array<any>;

    /**
     * 调用action更新数据
     */
    update = (params:{content?:string}={}) => {
        this.props.updateArticleInfo({
            ...params, 
            articleID: this.props.currentArticleID,
            title: this.props.title
        });
    }

    //失去焦点更新数据到数据库
    updateOnBlur = () => {
        this.update();
    }

    //点击提交存库
    submit = () => {
        this.update({
            content: this.content
        });
    }

    // 同步title到store
    changeTitle = (title) => {
        this.props.updateTitle(title);
    }

    //从子组件中拿到内容
    changeEditorContent = (content) => {
        this.content = content;
    }

    //从子组件中拿到文件
    changeFileUpload = (files) => {
        this.files = files;
    }

    render() {
        return (
            <div className='col m-content'>
                <Title title={this.props.title} onChange={this.changeTitle} onBlur={this.updateOnBlur} />
                <Editor content={this.props.content} onChange={this.changeEditorContent} />  
                <FileUpload onChange={this.changeFileUpload} />
                <Footer onClick={this.submit} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)