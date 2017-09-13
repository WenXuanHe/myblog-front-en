import * as React from 'react'
import { getter } from '$utils/immutable-extend'
import { StoreState } from '$redux/store/data'
import actions from '$actions/index'
import {ActionTypes} from '$redux/actionType/index'
import { connect, Dispatch } from 'react-redux'
import FileEditor from '../../editor/FileEditor'
import { Link } from 'react-router-dom'

interface Props {
    title: string,
    updateArticleInfo: (data:any) => void,
    UpdateTitle: (title:string) => void
}

/**
 * 从store中拿到的状态
 * @param param0 
 */
const mapStateToProps = ({ writer }: StoreState) => {
    let currentWorkID = writer.getIn(['currentWorkID']).toString();
    let currentArticleID = writer.getIn(['currentArticleID']).toString();
    let title = writer.getIn(['articleLists', currentWorkID, currentArticleID, 'title']);
    return {
        title
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
        UpdateTitle: (title:string) => {
            dispatch({
                type: ActionTypes.UPDATE_ARTICLE_INFO,
                payload: {title}
            })
        }
    }
}

class Content extends React.Component<Props> {

    /**
     * 失去焦点时存库
     */
    fetchUpdateArticleInfo = () => {
        let title = this.props.title;
        this.fetchArticle({
            title
        });
    }

    /**
     * title{* string}
     * content{* string}
     */
    fetchArticle = (params) => {
        let { updateArticleInfo} = this.props;
        updateArticleInfo({
            ...params
        });
    }

    /**
     * 同步本地中的数据
     */
    UpdateTitle = () => {
        this.props.UpdateTitle(this.props.title);
    }

    // todo，由Editor自己处理
    submitArticle = () => {
        this.fetchArticle({
            content: this.props.content,
            title: this.props.title
        });
    }

    render() {
        return (
            <div className='col m-content'>
                <header className='mb2'>
                    <input type='text' value={this.props.title} onChange={this.UpdateTitle} onBlur={this.fetchUpdateArticleInfo} />
                </header>
                < FileEditor />
                <div className="u-footer u-footer-skin">
                    <Link to="/writer/index" className="ml10">返回文章列表</Link>
                    <a href='javascript:void(0);' className="btn btn-green" onClick={this.submitArticle}> 提交 </a>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)