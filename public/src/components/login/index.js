// import React from 'react';
let React = require('react');
let Submit = require('../buttons/submit');
let axios = require('axios');

class Login extends React.Component{
    constructor(){
        super(...arguments);
        this.timer = null;
        this.state = {
            timer:null,
            userName:'',
            password:'',
            tip:{
                display:false,
                value:'',
                className:''
            }
        };
    }
    
    render(){
        return (
            <div className="m-login">
                <div className="u-userName form-control">
                    <label className="flex"> 
                        <span>用户名: </span>
                        <input type='text' name='userName' placeholder='请输入用户名' className="col-2" value={this.state.userName} onChange={this.judgeRepeat} />
                        {
                            this.state.tip.display && 
                            <span className={this.state.tip.className}>{this.state.tip.value}</span>
                        }
                    </label>
                </div>
                <div className="u-password form-control">
                    <label className="flex">
                        <span>密码: </span>
                        <input type='text' placeholder='请输入密码' className="col-2" value={this.state.password} />
                    </label>
                </div>
                <div className="u-submit form-control">
                    <Submit func={this.login} value='登录'/>
                </div>
            </div>
        )
    }

    judgeRepeatThoughtRedis = (userName) =>{
        let _self = this;
        return axios.post('/judgeRepeat', {
            userName
        }).then(function(result){
            _self.setState({
                tip:'该账号还未注册',
                display:true,
                className:'notice'
            });
        }).catch(function(ex){
             _self.setState({
                tip:'请求失败，请重试',
                display:true,
                className:'error'
            });
            console.log(ex);
        })
    }


    /**
     * 判断是否重复
     */
    judgeRepeat = (e) => {
        //先用防抖函数来判断是否还会继续输入，如果不输入，才会调方法执行
        let userName = e.target.value;
        clearTimeout(this.state.timer);
        var timer = setTimeout(function(){
            
        }, 1000);

        this.setState({
            userName,
            timer
        });
        
    }

    login (){

    }
}

module.exports = Login;

