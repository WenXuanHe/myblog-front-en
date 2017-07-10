import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import cs from 'classnames'
import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'
import actions from '$redux/actions/write'
import commonFetch from '$redux/actions/commonFetch'


const setCurrentWorkInfo = function(){
    //todo 做成存到localstoage里面，后面直接取缓存的数据
}
const setCurrentArticleInfo = function(){
    //todo 做成存到localstoage里面，后面直接取缓存的数据
}
const getCurrentWorkInfo = function(workList, workID){
    
    return workList.find((item) => item.id === workID);
}
const getCurrentArticleList = function(articleList, articleID){
    return articleList.find((item) => item.id === articleID);
}

const mapStateToProps = (state, ownProps) => {
    return {
        workList: state.writer.workList,
        currentArticle: state.writer.currentArticle,
        currentWork: state.writer.currentWork
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        
        createNewArticle:(data)=>{dispatch(commonFetch(actions.createNewArticle, data))},
        //非异步
        changeActiveArticle:(data)=>{dispatch(actions.changeActiveArticle({payload:data}))}
    }
}

class CreateArticle extends React.Component{

    static PropTypes = {
        currentWork: PropTypes.number.isRequired,
        currentArticle: PropTypes.number.isRequired,
        workList: PropTypes.number.isRequired
    }
    render(){

        let {workList, currentWork, currentArticle} = this.props;
        let workInfo = getCurrentWorkInfo(workList, currentWork);
        let articleList = workInfo.articleList;

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
                        styles['u-article-active'] = currentArticle === item.id;
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
        let {currentWork, createNewArticle} = this.props;
        createNewArticle({
            url:'write/createNewArticle',
            fetchData: {
                workID: currentWork
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

