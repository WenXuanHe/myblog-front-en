import React from 'react'

import Submit from '../../buttons/submit'
import Cancle from '../../buttons/cancle'

export default class CreateArticle extends React.Component{

    constructor(){
        super(...arguments);
        this.state={
            fileList:[]
        };
    }
    render(){
        return (
            <div className='m-add-article'>
                <div className='u-create' onClick={this.create}>
                    <div className='field'>+新建文章</div>
                </div>
                {
                    this.state.fileList.map((item, i) => {
                        return (
                            <div className='u-article-list' data-id={item.id}>
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
        )
    }

    create = () => {
        let fileList = this.state.fileList;
        fileList.unshift(this.addArticle(fileList.length));
        this.setState({
            fileList:fileList
        });
    }

    addArticle = (len)=>{
        return {
            id:`add-${len}`,
            title:''
        }
    }

}
