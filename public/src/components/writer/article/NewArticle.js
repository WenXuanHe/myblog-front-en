import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import cs from 'classnames'
import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'
import actions from '$redux/actions/write'
import commonFetch from '$redux/commonFetch'
import {getCurrentWorkInfo} from '$utils'

const mapStateToProps = (state, ownProps) => {
    return {
        workList: state.writer.workList,
        currentArticleID: state.writer.currentArticleID,
        currentWorkID: state.writer.currentWorkID
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        
        createNewArticle:(data)=>{dispatch(commonFetch(actions.createNewArticle, data))},
        //非异步
        changeActiveArticle:(data)=>{dispatch(actions.changeActiveArticle())}
    }
}

class CreateArticle extends React.Component{

    static PropTypes = {
        currentWorkID: PropTypes.number.isRequired,
        currentArticleID: PropTypes.number.isRequired,
        workList: PropTypes.number.isRequired
    }

    render(){
        let {workList, currentWorkID, currentArticleID} = this.props;
        let workInfo = getCurrentWorkInfo(workList, currentWorkID);
        let articleList = workInfo.articleList || [];
        let styles = {
            'u-article':true,
            'u-article-active':false
        };
        return (
            <div className='m-add-article'>
                <div className='u-create' onClick={this.createArticle}>
                    <div className='field'>+新建文章</div>
                </div>
                <div className='u-article-list'>
                {
                    articleList.map((item) => {
                        styles['u-article-active'] = currentArticleID === item.id;
                        return (
                            <div className={cs(styles)}
                             data-id={item.workID} onClick={this.changeActiveArticle.bind(this, item.id)}>
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

    createArticle = () => {
        let {currentWorkID, createNewArticle} = this.props;
        createNewArticle({
            url:'writer/createNewArticle',
            fetchData: {
                workID: currentWorkID
            }
        });
    }
    
    changeActiveArticle = (articleID)=>{
        let {currentWork, changeActiveArticle} = this.props;
        changeActiveArticle({
            workID: currentWork,
            articleID
        });
    }

}

// export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

