// let React = require('react')
// let connect = require('react-redux').connect
// let { Link  } = require('react-router-dom')
// let mapStateToProps = require ('../redux/connect/mapStateToProps');

import *  as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { storeType } from '$redux/store/data'

interface Props {
    workList: any
}

const mapStateToProps = ({writer}: storeType) => {
    return {
        workList: writer.getIn(['workList'])
    }
}

class Home extends React.Component<Props> {

    render() {
        let { workList } = this.props
        return (
            <div className="g-home">
                <div className="m-header m-header-skin">
                    <Link to="/writer/writer">写文章</Link>
                </div>
                <ul className="m-list m-list-skin">
                    {
                        workList.size && workList.map((item) => {
                            return (
                                <li key={item.get('id')} className="m-list-item">
                                    <a className="m-list-item-title">{item.get('title')}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        )
    }
}

export default connect(mapStateToProps)(Home);
