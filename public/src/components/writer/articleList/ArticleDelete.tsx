
import * as React from 'react'


interface Props{
    onClick: (id:string|number) => void,
    id:string|number
}

class ArticleDelete extends React.PureComponent<Props> {

    delete = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return <span className="z-file-logo" onClick={this.delete}>
            <i className="iconfont">&#xe6f2;</i>
        </span>
    }
}
export default ArticleDelete;