// import React from 'react'
// import '../styles/index.scss';

let React = require('react');
require('../styles/index.scss');

class Index extends React.Component{

    render(){
        return (
            <div>
               <a href="javascript:void(0);" onClick={this.submit}>提交</a>
            </div>
        )
    }

    //todo
    submit = () => {
        // let files = this.refs.fileEditor.getFiles();
        // let content = this.refs.fileEditor.getEditContent();
        
    }
}

// export default Index;
module.exports = Index;
