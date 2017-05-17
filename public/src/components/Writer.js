
import React from 'react'

import '../styles/writer.scss'
import CreateProject from './create/createProject'

export default class Writer extends React.Component{

    render(){
        return (
            <div className='g-write flex'>
                <div className='col-5'>
                    <CreateProject />

                </div>
                <div className='col-4'>

                </div>
                <div className='col'>

                </div>
            </div>
        )
    }
}
