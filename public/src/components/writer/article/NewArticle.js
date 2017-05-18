import React from 'react'
import cs from 'classnames'

import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'

export default class CreateArticle extends React.Component{

    constructor(){
        super(...arguments);
        this.state={
            fileList:[],
            active:0
        };
    }
    render(){
        return (
            <div className='m-add-article'>
                <div className='u-create' onClick={this.create}>
                    <div className='field'>+新建文章</div>
                </div>
                <div className='u-article-list'>
                {
                    this.state.fileList.map((item, i) => {
                        let styles = {
                            'u-article':true,
                            'u-article-active':(this.state.active===i)
                        }
                        return (
                            <div className={cs(styles)}
                             data-id={item.id} onClick={this.active.bind(this,i)}>
                                <div className='field z-unit flex'>
                                    <span className='z-file-logo'>
                                        <i className="iconfont">&#xe6f4;</i>
                                    </span>
                                    <span className="col z-file-title">{item.title || '无标题文章'}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    create = () => {
        let fileList = this.state.fileList;
        fileList.unshift(this.addArticle(fileList.length));
        this.setState({
            fileList:fileList
        });
    }
    active = (i)=>{
        this.setState({
            active: i
        });
    }
    addArticle = (len)=>{
        return {
            id:`add-${len}`,
            title:''
        }
    }

}
