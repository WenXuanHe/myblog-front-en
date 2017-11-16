import * as React from 'react'
import WorkList from '$components/writer/workList'
import ArticleList from '$components/writer/articleList'
import Content from '$components/writer/content'
import persistence from '$helper/persistence'

class Writer extends React.PureComponent {

    constructor(props){
        super(props);
    }

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

export default Writer

