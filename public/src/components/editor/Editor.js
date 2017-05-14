import React from "react"
import wangEditor from 'wangeditor'
import {simpleMenus, menus} from '../../config/editor'

export default class Editor extends React.Component {

    styles = () => {
        return {
            width: '100%',
            height: '200px'
        }
    }
    /**
     * style:{},
     * config:{},
     * simple:boolen
     */
    constructor() {
        super(...arguments);
    }

    componentWillMount(){
        this.style = this.props.style || this.styles();
    }

    render () {
        return (
            <div>
                <div id = {this.props.id} style={this.style}
                contentEditable="true"></div>
            </div>
        );
    }
    componentDidMount () {
        let props = this.props;
        this.editor = new wangEditor(props.id);
        //配置编辑器
        this.editorConfig(this.editor, props).create();
        this.editor.$txt.html(props.content || '<p><br/></p>');
    }

    //处理一些配置
    editorConfig = (editor, props) =>{
        let config = props.config || {};
        config.menu = props.simple ? simpleMenus : menus;
        Object.assign(editor.config, config);
        return editor;
    }

    getEditContent = () =>{
        return this.editor.$txt.html();
    }
}
