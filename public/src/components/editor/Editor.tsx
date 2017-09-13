import * as React from "react"
import * as  wangEditor from 'wangeditor'
import {simpleMenus, menus} from '../../config/editor'
import { StoreState } from '$redux/store/data'
import {connect} from 'react-redux'

interface Props{
    content: string,
    config?:any,
    simple?:boolean
}

const mapStateToProps = ({ writer }:StoreState) => {
    return {
        content: writer.getIn(['content'])
    }
}


class Editor extends React.PureComponent<Props> {

    editor:any;

    constructor(){
        super();
        this.editor = null;
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
        let editor = new wangEditor(this.refs.editorElem);
        editor.txt.$txt.html(this.props.content || '<p><br/></p>');
        //配置编辑器
        this.editor = this.editorConfig(editor);
        this.editor.create();
    }

    componentWillUnmount () {
        this.setState({
            editor: null
        });
        wangEditor.numberOfLocation--;  
    }

    //处理一些配置
    editorConfig = (editor) =>{
        let config:{menu?:any} = {};
        config.menu = this.props.simple ? simpleMenus : menus;
        Object.assign(editor.config, config);
        return editor;
    }

    getEditContent = () =>{
        return this.editor.txt.$txt.html();
    }
}

export default connect(mapStateToProps)(Editor);
