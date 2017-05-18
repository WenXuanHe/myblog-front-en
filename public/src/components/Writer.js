
import React from 'react'

import '../styles/writer.scss'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'
import FileEditor from './editor/FileEditor'

export default class Writer extends React.Component{
    constructor(){
        super(...arguments);
        this.state={
            fileList:[],
            active:0
        };
    }
    render(){
        return (
            <div className='g-write flex'>
                <div className='col-5 m-work'>
                    <NewWorks />
                </div>
                <div className='col-4 m-article'>
                    <NewArticle />
                </div>
                <div className='col m-content'>
                    <header>
                        <input type='text' value={this.state.fileList[active].title} />
                    </header>
                    <FileEditor ref='fileEditor' />
                </div>
            </div>
        )
    }
}
