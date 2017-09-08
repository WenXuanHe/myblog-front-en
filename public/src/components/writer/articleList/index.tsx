import * as React from 'react'
import { StoreState } from '$redux/store/data'
import { connect, Dispatch } from 'react-redux'
import cs from 'classnames'
import actionType from '$redux/actionType'
import Article from './Article'
import ArticleDelete from './ArticleDelete'
import actions from '$actions/index'

type changeActiveArticleType = {
    workID: number,
    articleID: number
}
type stylesType = {
    'u-article': boolean,
    'u-article-skin': boolean,
    'u-article-active': boolean
}

interface Props{
    articleInfos:any,
    currentArticleID: number,
    currentWorkID:number,
    createNewArticle: (workID: number) => void,
    deleteArticleById: (articleID: number) => void,
    changeActiveArticle: (data:changeActiveArticleType) => void
}

interface States{
    styles: stylesType
}
/**
 * 从store中拿到的状态
 * @param param0 
 */
const mapStateToProps = ({ writer }: StoreState) => {
    let articleLists = writer.getIn(['articleLists']);
    let currentWorkID = writer.getIn(['currentWorkID']);
    return {
        articleInfos: articleLists.get(currentWorkID.toString()),
        currentWorkID,
        currentArticleID: writer.getIn(['currentArticleID'])
    }
}

const articleMap = (dispatch:Dispatch<any>, ownProps) => {
    return {
        createNewArticle: (workID) => { dispatch(actions.fetchCreateNewArticle(workID)) },
        deleteArticleById: (articleID) => {  dispatch(actions.deleteArticleById(articleID)) },

        changeActiveArticle: (data) => {
            dispatch({
                type:actionType.CHANGE_ACTIVE_ARTICLE,
                payload: data })
        },
    }
}

class ArticleList extends React.Component<Props, States> {

    constructor() {
        super();
        this.state = {
            styles : {
                'u-article': true,
                'u-article-skin': true,
                'u-article-active': false
            }
        };
    }
    //抽离出原本在map中的内容，避免在render中使用箭头函数
    articleItem = (key:string) => {
        let article = this.props.articleInfos.get(key);
        let current = this.props.currentArticleID === article.id;
        let styles = this.state.styles;
        styles['u-article-active'] = current;
        this.setState({styles});

        return <Article styles={cs(this.styles)} onClick={this.changeActiveArticle} article={article}>
                {
                    current && <ArticleDelete onClick={this.deleteArticle} id={article.id} />  
                }
            </Article>
    }
    render() {
        let { articleInfos } = this.props;
        return (
            <div className='m-add-article'>
                <div className='u-create' onClick={this.createArticle}>
                    <div className='field'>+新建文章</div>
                </div>
                <div className='u-article-list'>
                    {
                        articleInfos && Object.keys(articleInfos).map(this.articleItem)
                    }
                </div>
            </div>
        )
    }

    createArticle = () => {
        this.props.createNewArticle(this.props.currentWorkID);
    }

    deleteArticle = (articleID:number) => {
        this.props.deleteArticleById(articleID);
    }

    changeActiveArticle = (articleID:number) => {
        let { currentWorkID, changeActiveArticle } = this.props;
        changeActiveArticle({
            workID: currentWorkID,
            articleID
        });
    }

}

export default connect(mapStateToProps, articleMap)(ArticleList);

