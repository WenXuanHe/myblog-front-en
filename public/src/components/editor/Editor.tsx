import * as React from "react"
import * as  wangEditor from 'wangeditor'
import {simpleMenus, menus} from '../../config/editor'

interface Props{
    content: string,
    onChange: (content:string) => void,
    simple?:boolean
}

class Editor extends React.PureComponent<Props> {

    editor:any;
    constructor(){
        super();
        this.editor = null;
    }

    //同步content的数据
    getEditContent = () =>{
        var value = this.editor.txt.$txt.html();
        this.props.onChange(value);
    }

    render () {
        return (
            <div className="u-editor" ref="editorElem" contentEditable={true} onKeyUp={this.getEditContent}>{this.props.content}</div>
        )
    }

    componentDidMount () {
        let editor = new wangEditor(this.refs.editorElem);
        editor.txt.$txt.html(this.props.content);
        //配置编辑器
        this.editor = this.editorConfig(editor);
        this.editor.create();
    }
    /**
     * 销毁组件时将引用置为null
     */
    componentWillUnmount () {
        this.editor=null;
        wangEditor.numberOfLocation--;  
    }

    //处理一些配置
    editorConfig = (editor) =>{
        let config:{menu?:any} = {};
        config.menu = this.props.simple ? simpleMenus : menus;
        Object.assign(editor.config, config);
        return editor;
    }
}

export default Editor;
