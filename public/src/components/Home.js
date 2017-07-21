// import React from 'react'
// import '../styles/index.scss';

let React = require('react')
let connect = require('react-redux').connect
let { Link  } = require('react-router-dom')
let moment = require('moment');
const mapStateToProps = (state, ownProps) => {
    return {
        workList: state.writer.workList
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

class Home extends React.Component {

    render() {
        let { workList } = this.props
        return (
            <div className="g-home">
                <div className="m-header m-header-skin">
                    <div><Link to="/writer">写文章</Link></div>
                </div>
                <ul className="m-list m-list-skin">
                    {
                        workList.length && workList.map((item) => {
                            return (
                                <li key={item.id} className="m-list-item">
                                    <a className="m-list-item-title">{item.title}</a>
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
        this.props.history.push(`/writer?workID=${workID}&articleID=${articleID}`);
    }

}

// export default Index;
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
