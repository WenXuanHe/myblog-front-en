import '../styles/writer.scss'
import React from 'react'
import AddProject from './addProject/addProject'

export default class Writer extends React.Component{

    render(){
        return (
            <div className='g-write flex'>
                <div className='col-5'>
                    <AddProject />
                </div>
                <div className='col-4'>

                </div>
                <div className='col'>

                </div>
            </div>
        )
    }
}
