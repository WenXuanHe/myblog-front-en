import * as React from 'react'
import { dataStates } from '$redux/store/data'
import { connect, Dispatch } from 'react-redux'
import * as cs from 'classnames'
import {ActionTypes} from '$redux/actionType/index'
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

interface Props {
    articleInfos: any,
    currentArticleID: number,
    currentWorkID: number,
    createNewArticle: (workID: number) => void,
    deleteArticleById: (articleID: number) => void,
    changeActiveArticle: (data: changeActiveArticleType) => void
}

/**
 * 从store中拿到的状态
 * @param param0 
 */
const mapStateToProps = (data: dataStates) => {
    let articleLists = data.getIn(['writer', 'articleLists']);
    let currentWorkID = data.getIn(['writer', 'currentWorkID']);
    return {
        articleInfos: articleLists ? articleLists.get(currentWorkID.toString()) : null,
        currentWorkID,
        currentArticleID: data.getIn(['writer', 'currentArticleID'])
    }
}

const articleMap = (dispatch: Dispatch<any>, ownProps) => {
    return {
        createNewArticle: (workID) => { dispatch(actions.fetchCreateNewArticle(workID)) },
        deleteArticleById: (articleID) => { dispatch(actions.deleteArticleById(articleID)) },

        changeActiveArticle: (data) => {
            dispatch({
                type: ActionTypes.CHANGE_ACTIVE_ARTICLE,
                payload: data
            })
        },
    }
}

class ArticleList extends React.Component<Props, undefined> {

    styles:stylesType;
    constructor() {
        super();
        this.styles= {
            'u-article': true,
            'u-article-skin': true,
            'u-article-active': false
        }
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
                        articleInfos && articleInfos.map((value) => {
                            let current = this.props.currentArticleID === value.get('id');
                            this.styles['u-article-active'] = current;
                            return <Article styles={cs(this.styles)} onClick={this.changeActiveArticle} article={value}>
                                {
                                    current && <ArticleDelete onClick={this.deleteArticle} id={value.get('id')} />
                                }
                            </Article>
                        })
                    }
                </div>
            </div>
        )
    }

    createArticle = () => {
        this.props.createNewArticle(this.props.currentWorkID);
    }

    deleteArticle = (articleID: number) => {
        this.props.deleteArticleById(articleID);
    }

    changeActiveArticle = (articleID: number) => {
        let { currentWorkID, changeActiveArticle } = this.props;
        changeActiveArticle({
            workID: currentWorkID,
            articleID
        });
    }

}

export default connect(mapStateToProps, articleMap)(ArticleList);

