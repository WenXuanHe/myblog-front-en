// import React from 'react'
// import '../styles/index.scss';

let React = require('react')
let connect = require('react-redux').connect
let { Link  } = require('react-router-dom')
let moment = require('moment');
const mapStateToProps = (state, ownProps) => {
    return {
        articleList: state.writer.articleList
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

class Home extends React.Component {

    render() {
        let { articleList } = this.props
        return (
            <div className="g-home">
                <div className="m-header m-header-skin">
                    <div><Link to="/writer">写文章</Link></div>
                </div>
                <ul className="m-list m-list-skin">
                    {
                        articleList.length && articleList.map((item) => {
                            let lastModified = moment(item.lastModified).format('YYYY-MM-DD HH:mm:ss');
                            let content = item.simpleContent.replace(/(&lt;[^(&gt;)]+&gt;)|(<[^>]+>)/g, '');
                            return (
                                <li key={item.id} className="m-list-item" onClick={this.editArticle.bind(this, item)}>
                                    <div className="m-list-item-title">{item.title}</div>
                                    <p className="m-list-item-body fs-13">{content}</p> 
                                    <div className="m-list-item-footer">最后修改日期：{lastModified}</div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

        )
    }

    editArticle(article){
        let workID = article.workID;
        let articleID = article.id;
        let articleIDHash = JSON.parse(localStorage.getItem('currentArticleIDHash') || '{}');
        localStorage.setItem('currentWorkID', workID);
        articleIDHash[workID] = articleID;
        localStorage.setItem('currentArticleIDHash', JSON.stringify(articleIDHash));
        this.props.history.push('/writer');
    }

}

// export default Index;
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
