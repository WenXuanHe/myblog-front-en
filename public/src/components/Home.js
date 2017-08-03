// import React from 'react'
// import '../styles/index.scss';

let React = require('react')
let connect = require('react-redux').connect
let { Link  } = require('react-router-dom')
let moment = require('moment');
let { getter } = require ('../utils/immutable-extend');

const mapStateToProps = (state, ownProps) => {
    return {
        workList: getter(state.writer, 'workList')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

class Home extends React.Component {

    render() {
        let { workList } = this.props
        return (
            <div className="g-home">
                <div className="m-header m-header-skin">
                    <Link to="/writer/writer">写文章</Link>
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
}

// export default Index;
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
