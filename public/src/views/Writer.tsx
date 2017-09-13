import * as React from 'react'
import { connect } from 'react-redux'
import WorkList from '$components/writer/workList'
import ArticleList from '$components/writer/articleList'
import Content from '$components/writer/content'
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import persistence from '$helper/persistence'
import { StoreState } from '$redux/store/data'

interface Props{
    contentVisible:boolean
}

const mapStateToProps = ({ writer }:StoreState) => {
    return {
        contentVisible: writer.getIn(['contentVisible'])
    }
}


class Writer extends React.Component<Props> {

    // constructor(){
    //     super(...arguments);
    //     // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    // }

    render() {
        return (
            <div className='g-write flex'>
                <div className='col-5 m-work'>
                    <WorkList/>
                </div>
                <div className='col-4 m-article'>
                    <ArticleList/>
                </div>
                <Content/>
            </div>
        )
    }

    componentDidMount(){
        //持久化页面渲染信息
        persistence();
    }
}

export default connect(mapStateToProps)(Writer)

