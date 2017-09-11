import * as React from "react"
import wangEditor from 'wangeditor'
import {simpleMenus, menus} from '../../config/editor'
import { StoreState } from '$redux/store/data'
import {connect} from 'react-redux'
import _ from 'lodash'

interface Props{
    content: any
}

interface States{
    editor:any
}


const mapStateToProps = ({ writer }:StoreState) => {
    return {
        content: writer.getIn(['content'])
    }
}


class Editor extends React.Component<Props, States> {

    constructor(){
        super();
        this.state = {
            editor: null
        }
    }
    styles = () => {
        return {
            width: '100%',
            height: '500px'
        }
    }

    render () {
        let style = this.styles();
        return (
            <div style={style} ref="editorElem" contentEditable={true}>{this.props.content}</div>
        )
    }
    componentDidMount () {
        const props = this.props;
        const elem = this.refs.editorElem;
        let editor = new wangEditor(elem);
        editor.$txt.html(props.content || '<p><br/></p>');
        //配置编辑器
        this.editorConfig(this.state.editor, props).create();
        this.setState({editor});
    }

    componentWillUnmount () {
        this.setState({
            editor: null
        });
        wangEditor.numberOfLocation--;  
    }

    //处理一些配置
    editorConfig = (editor, props) =>{
        let config = props.config || {};
        config.menu = props.simple ? simpleMenus : menus;
        _.assign(editor.config, config);
        return editor;
    }

    getEditContent = () =>{
        return this.state.editor.$txt.html();
    }
}

export default connect(mapStateToProps)(Editor);
