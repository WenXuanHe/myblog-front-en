// import React from 'react'
// import '../styles/index.scss';

let React = require('react')
let connect = require('react-redux').connect
let { Link } = require('react-router-dom')
const mapStateToProps = (state, ownProps) => {
    return {
        workList: state.writer.workList
    }
}
const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
    }
}

class Home extends React.Component{

    render(){
        let {workList} = this.props
        return (
            <div className='m-list'>
                <div>
                    <a href="javascript:void(0);" onClick={this.submit}>提交</a>
                </div>
                {
                    workList.length && workList.map((item) => {
                        return (
                            <div id={item.id}>
                                {item.title}
                            </div>
                        )
                    })
                }
                <div>
                    <Link to="/writer">写文章</Link>

                </div>
            </div>
        )
    }
    //todo
    submit () {
        // let files = this.refs.fileEditor.getFiles();
        // let content = this.refs.fileEditor.getEditContent();
        
    }
}

// export default Index;
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
