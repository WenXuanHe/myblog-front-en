
import React from 'react'

import '../styles/writer.scss'
import NewWorks from './writer/works/NewWorks'
import NewArticle from './writer/article/NewArticle'

export default class Writer extends React.Component{

    render(){
        return (
            <div className='g-write flex'>
                <div className='col-5'>
                    <NewWorks />

                </div>
                <div className='col-4'>
                    <NewArticle />

                </div>
                <div className='col'>

                </div>
            </div>
        )
    }
}
