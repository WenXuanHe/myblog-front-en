let React = require('react')
let connect = require('react-redux').connect
let { Link  } = require('react-router-dom')
let mapStateToProps = require ('../redux/connect/mapStateToProps');

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

module.exports = connect( mapStateToProps('writer', ['workList']) )(Home);
